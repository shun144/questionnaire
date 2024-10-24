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
// use App\Models\Quize;
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
            // $params = $request->only(['flow_id']);
           
            $flow_records = DB::table('flows')
            ->where('id', $id)
            ->select('title', 'url', 'first_question_id', 'x', 'y', 'zoom')
            ->first();


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


            // dd([
            //     'question_records' => $question_records, 
            //     'result_records' => $result_records, 
            //     'edge_records' => $edge_records, 
            // ]);


            $question_datas = is_null($question_records->node_datas) ? '[]' : $question_records->node_datas;
            $result_datas = is_null($result_records->node_datas) ? '[]' : $result_records->node_datas;
            $edge_datas = is_null($edge_records->edge_datas) ? '[]': $edge_records->edge_datas;


            // dd([
            //     'question_records' => $question_records, 
            //     'is_null($question_records)' => is_null($question_records), 
            //     'question_datas' => $question_datas,
            //     'result_datas' => $result_datas,
            //     'edge_datas' => $edge_datas,
            // ]);


            return Inertia::render('Owner/flow/cityHeaven/FlowLayout', [
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

            // return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
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
        try {
            $params = $request->only([ 'category']);
            $user_id = Auth::user()->id;

            $flow_id = DB::table('flows')->insertGetId([
                'title' => "",
                'url' => "",
                'category' => $params['category'],
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
            // return Redirect::route('dashboard');

        }
        catch (\Exception $e) {
            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
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
           
            $records = DB::table('flows')
            ->where('user_id', $user_id)
            ->select('id','category', 'title','url', 'first_question_id as firstQuestionId')
            ->get();
            $datas = isset($records) ? $records: [];
            
            return Inertia::render('Owner/board/MainBoard', [
                'initialFlows' =>  $datas,
            ]);
        }
        catch (\Exception $e) {
            return Inertia::render('Owner/board/MainBoard', [
                'initialFlows' =>  [],
            ]);
        }
    }

    public function commit(Request $request, $id)
    {
        $user_id = Auth::user()->id;

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:50'],

            'url' => ['required', 'string', 'max:15', 'alpha_num',
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

    // public function getEdges(Request $request){
    //     try {
    //         $params = $request->only(['flow_id']);
           
    //         $records = DB::table('edges')
    //         ->where('flow_id', $params['flow_id'])
    //         ->select('edge_datas')
    //         ->first();

    //         $data = isset($records) ? $records->edge_datas: [];

    //         return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
    //     }
    //     catch (\Exception $e) {

    //         $data = [
    //             'err' => $e->getMessage()
    //         ];
    //         return response()->json($data);
    //     }
    // }

    // public function getQuestionNodes(Request $request){
    //     try {
    //         // $flow_id = $this->getBoardIdBySessionUser();
    //         $params = $request->only(['flow_id']);
           
    //         $records = DB::table('questions')
    //         ->where('flow_id', $params['flow_id'])
    //         ->select('node_datas')
    //         ->first();

    //         $data = isset($records) ? $records->node_datas: [];

    //         return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
    //     }
    //     catch (\Exception $e) {

    //         $data = [
    //             'err' => $e->getMessage()
    //         ];
    //         return response()->json($data);
    //     }
    // }

    // public function getResultNodes(Request $request){
    //     try {             
    //         // $flow_id = $this->getBoardIdBySessionUser();
    //         $params = $request->only(['flow_id']);
           
    //         $records = DB::table('results')
    //         ->where('flow_id', $params['flow_id'])
    //         ->select('node_datas')
    //         ->first();

    //         $data = isset($records) ? $records->node_datas: [];

    //         return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
    //     }
    //     catch (\Exception $e) {
    //         $data = [
    //             'err' => $e->getMessage()
    //         ];
    //         return response()->json($data);
    //     }
    // }

    // public function commit(Request $request){
    //     try {

    //         // dd($request);
    //         $params = $request->only([
    //             'flow_id',
    //             'update_questions',
    //             'update_results',
    //             'update_edges',
    //             'first_question_id',
    //             'title',
    //             'url'
    //         ]);

    //         DB::table('flows')
    //         ->where('id', $params['flow_id'])
    //         ->update([
    //             'first_question_id' => $params['first_question_id'],
    //             'title' => $params['title'],
    //             'url' => $params['url'],
    //         ]);


    //         DB::table('questions')
    //         ->where('flow_id', $params['flow_id'])
    //         ->update([
    //             'node_datas' => $params['update_questions'],
    //         ]);

    //         DB::table('results')
    //         ->where('flow_id', $params['flow_id'])
    //         ->update([
    //             'node_datas' => $params['update_results'],
    //         ]);

    //         DB::table('edges')
    //         ->where('flow_id', $params['flow_id'])
    //         ->update([
    //             'edge_datas' => $params['update_edges'],
    //         ]);

    //         return response()->json(
    //             ['flow_id' =>  $params['flow_id']
    //         ],200,[],JSON_UNESCAPED_UNICODE);
    //     }
    //     catch (\Exception $e) {
    //         $data = [
    //             'err' => $e->getMessage()
    //         ];
    //         return response()->json($data);
    //     }
    // }
}
