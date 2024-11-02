<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

// use App\Http\Requests\ProfileUpdateRequest;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use App\Models\Flow;
use App\Models\Question;
use App\Models\Choice;
use App\Models\Result;
// use GuzzleHttp\Client;
// use Illuminate\Http\Client\Pool;
// use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;

class OwnerContoller extends Controller
{

    public function getFlow($id) {
        try {

            $flow_records = DB::table('flows')
            ->where('id', $id)
            ->select('title', 'url', 'first_question_id', 'x', 'y', 'zoom', 'category')
            ->first();

            $category = $flow_records->category;

            unset($flow_records->category); 


            $question_records = DB::table('questions')
            ->where('flow_id', $id)
            ->select('node_datas')
            ->first();
            
            $result_records = DB::table('results')
            ->where('flow_id', $id)
            ->select('node_datas')
            ->first();

            $edge_records = DB::table('edges')
            ->where('flow_id', $id)
            ->select('edge_datas')
            ->first();

            $question_datas = is_null($question_records->node_datas) ? '[]' : $question_records->node_datas;
            $result_datas = is_null($result_records->node_datas) ? '[]' : $result_records->node_datas;
            $edge_datas = is_null($edge_records->edge_datas) ? '[]': $edge_records->edge_datas;


            return Inertia::render('Owner/flow/'.$category.'/FlowLayout', [
                'id' =>  $id,
                'quesitions' => $question_datas,
                'results' => $result_datas,
                'edges' => $edge_datas,
                'title' => $flow_records->title,
                'url' => $flow_records->url,
                'x' => $flow_records->x,
                'y' => $flow_records->y,
                'zoom' => $flow_records->zoom,
                'initFirstQuestionId' => $flow_records->first_question_id
            ]);
        }
        catch (\Exception $e) {

            $data = [
                'err' => $e->getMessage()
            ];
            return Inertia::render('Owner/flow/cityHeaven/FlowLayout', [
                'id' =>  $id,
                'flowData' => $data,
            ]);
        }
    }


    public function addFlow(Request $request){
        $user_id = Auth::user()->id;

        $validatedData = $request->validate([
            'initialTitle' => ['required', 'string', 'max:50'],
            'initialUrl' => ['required', 'string', 'max:15', 'alpha_num:ascii',
                            Rule::unique('flows', 'url') // 'url' をカラムとして指定
                            ->where(function ($query) use ($user_id) {
                                return $query->where('user_id', $user_id); // user_id スコープを追加
                            })],
            'initialCategory' => ['required'],
        ]);

        $params = $request->only(['category']);
        $user_id = Auth::user()->id;

        $flow_id = DB::table('flows')->insertGetId([
            'title' => $validatedData['initialTitle'],
            'url' => $validatedData['initialUrl'],
            'category' => $validatedData['initialCategory'],
            'user_id' => $user_id
        ]);

        DB::table('questions')->insert([
            'flow_id' => $flow_id,
        ]);

        DB::table('results')->insert([
            'flow_id' => $flow_id
        ]);

        DB::table('edges')->insert([
            'flow_id' => $flow_id
        ]);

        return Redirect::route('flow.index', ['id' => $flow_id]);
    }


    public function updateFlow(Request $request, $id){
        $user_id = Auth::user()->id;

        $validatedData = $request->validate([
            'editTitle' => ['required', 'string', 'max:50'],
            'editUrl' => [
                'required', 
                'string', 
                'max:15', 
                'alpha_num:ascii',
                Rule::unique('flows', 'url')
                ->where(function ($query) use ($user_id) {
                    return $query->where('user_id', $user_id);
                })
                ->ignore($id)
            ],
        ]);

        DB::table('flows')
        ->where('id', $id)
        ->update([
            'title' => $validatedData['editTitle'],
            'url' => $validatedData['editUrl'],
        ]);

        return redirect()->route('dashboard');
    }


    public function deleteFlow(Request $request){
        try {
            $params = $request->only(['flowId']);
            Flow::destroy($params['flowId']);
        }
        catch (\Exception $e) {
            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }

    public function getFlowList(){
        try {
            $user_id = Auth::user()->id;
           
            $isRegisteredApiCredential = DB::table('city_heavens')
                                            ->where('user_id', $user_id)->exists();

            $flow_records = DB::table('flows')
            ->where('user_id', $user_id)
            ->select('id','category', 'title','url', 'first_question_id as firstQuestionId')
            ->get();

            $datas = isset($flow_records) ? $flow_records: [];
            
            return Inertia::render('Owner/board/MainBoard', [
                'initialFlows' =>  $datas,
                'isRegisteredApiCredential' => $isRegisteredApiCredential,
            ]);
        }
        catch (\Exception $e) {
            return Inertia::render('Owner/board/MainBoard', [
                'initialFlows' =>  [],
                'isRegisteredApiCredential' => false,
            ]);
        }
    }

    public function commit(Request $request, $id)
    {
        $user_id = Auth::user()->id;

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:50'],

            'url' => [
                'required', 
                'string', 
                'max:15', 
                'alpha_num:ascii',
                // 'not_in:admin,login',
                function ($attribute, $value, $fail) {
                    $prohibitedNames = ['admin', 'login'];
                    if (in_array(strtolower($value), array_map('strtolower', $prohibitedNames))) {
                        $fail('入力された文字は登録できません');
                    }
                },
                Rule::unique('flows')->where(function ($query) use ($user_id) {
                    return $query->where('user_id', $user_id);
                })->ignore($id),
                ],       
            'first_question_id' => ['required'],            
        ]);

        $params = $request->only([
            'update_questions',
            'update_results',
            'update_edges',
            'x',
            'y',
            'zoom'
        ]);

        DB::table('flows')
        ->where('id', $id)
        ->update([
            'first_question_id' => $validatedData['first_question_id'],
            'title' => $validatedData['title'],
            'url' => $validatedData['url'],
            'x' =>  $params['x'],
            'y' =>  $params['y'],
            'zoom' =>  $params['zoom'],
        ]);

        DB::table('questions')
        ->where('flow_id',$id)
        ->update([
            'node_datas' => $params['update_questions'],
        ]);

        DB::table('results')
        ->where('flow_id', $id)
        ->update([
            'node_datas' => $params['update_results'],
        ]);

        DB::table('edges')
        ->where('flow_id', $id)
        ->update([
            'edge_datas' => $params['update_edges'],
        ]);

        // return to_route('flow.index',22)->with('success', 'ユーザを追加しました');

        return to_route('flow.index', $id);

        // return response()->json(
        //     ['flow_id' =>  $params['flow_id']
        // ],200,[],JSON_UNESCAPED_UNICODE);

    }

    public function getApiCredential() {
        try {

            $user_id = Auth::user()->id;

            $api_records = DB::table('city_heavens')
            ->where('user_id', $user_id)
            ->select('masking_access_key', 'masking_shop_id')
            ->first();

            $masking_access_key = "";
            $masking_shop_id = "";

            if (isset($api_records)) {
                $masking_access_key = $api_records->masking_access_key;
                $masking_shop_id = $api_records->masking_shop_id;
            }

            return Inertia::render('Owner/Setting/Edit', [
                'masking_access_key' =>  $masking_access_key,
                'masking_shop_id' => $masking_shop_id,
            ]);

        }
        catch (\Exception $e) {

            return Inertia::render('Owner/Setting/Edit', [
                'masking_access_key' =>  "",
                'masking_shop_id' => "",
            ]);
        }
    }


    public function getTotalling() {
        try {
            $user_id = Auth::user()->id;
            $flow_records = DB::table('flows')
            ->leftJoin('achievements', 'flows.id', '=', 'achievements.flow_id')
            ->select(
                'flows.id',
                'flows.title',
                'flows.category',
                DB::raw('COUNT(achievements.id) as total'))
            ->where('flows.user_id', $user_id)
            ->groupBy('flows.id', 'flows.title','flows.category' )
            ->get();

            $flows = isset($flow_records)? $flow_records : [];

            return Inertia::render('Owner/Totalling/Index', [
                'flows' => $flows
            ]);
        
        }
        catch (\Exception $e) {

            return Inertia::render('Owner/Totalling/Index', [
                'masking_access_key' =>  "",
                'masking_shop_id' => "",
            ]);
        }
    }

    public function getGraphData($id) {
        try {
            // $user_id = Auth::user()->id;



            $achievement_records = DB::table('achievements')
            ->select(
                'result',
                DB::raw('COUNT(result) as total'))
            ->where('flow_id', $id)
            ->groupBy('result')
            ->get();

            $labels = $achievement_records->isNotEmpty() ? $achievement_records->pluck('result')->toArray() : [];
            $datas = $achievement_records->isNotEmpty() ? $achievement_records->pluck('total')->toArray() : [];



            return response()->json([
                    'labels' =>  $labels,
                    'datas' => $datas,
                ],200,[],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e) {

            return Inertia::render('Owner/Totalling/Index', [
                'masking_access_key' =>  "",
                'masking_shop_id' => "",
            ]);
        }
    }

}
