<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use App\Models\Flow;
use App\Models\Question;
use App\Models\Choice;
use App\Models\Result;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Log;
use App\Rules\ProhibitedNames;

class OwnerContoller extends Controller
{

    /**
     * アンケート一覧を取得
     */
    public function getFlowList(){
        try {
            $user_id = Auth::user()->id;
           
            $flows = DB::table('flows')
                ->where('user_id', $user_id)
                ->select('id', 'title','url', 'first_question_id as firstQuestionId')
                ->get() ?? [];
            
            return Inertia::render('Owner/board/MainBoard', [
                'initialFlows' =>  $flows
            ]);
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            
            return Inertia::render('Owner/board/MainBoard', [
                'initialFlows' =>  [],
                'isRegisteredApiCredential' => false,
            ]);
        }
    }

    /**
     * 既存アンケート情報をID単位で取得
     */
    public function getFlow($id) {
        try {

            $flow = DB::table('flows')
                ->where('id', $id)
                ->select('title', 'url', 'first_question_id', 'x', 'y', 'zoom')
                ->first();
        
            
            // node_datasやedge_datasのデータをそれぞれ取得し、nullの場合のデフォルト値を設定
            $questions = DB::table('questions')->where('flow_id', $id)->value('node_datas') ?? '[]';
            $results = DB::table('results')->where('flow_id', $id)->value('node_datas') ?? '[]';
            $edges = DB::table('edges')->where('flow_id', $id)->value('edge_datas') ?? '[]';
                
            $data = [
                'id' => $id,
                'questions' => $questions,
                'results' => $results,
                'edges' => $edges,
                'title' => $flow->title,
                'url' => $flow->url,
                'x' => $flow->x,
                'y' => $flow->y,
                'zoom' => $flow->zoom,
                'initFirstQuestionId' => $flow->first_question_id,
            ];
        
            return Inertia::render("Owner/flow/FlowLayout", $data);
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return redirect()->route('dashboard');
        }
    }

    /**
     * アンケート追加
     */
    public function addFlow(Request $request){
        $user_id = Auth::id();

        $validatedData = $request->validate([
            'initialTitle' => ['required', 'string', 'max:50'],
            'initialUrl' => [
                'required', 'string', 'max:15', 'alpha_num:ascii',
                Rule::unique('flows', 'url')
                    ->where(function ($query) use ($user_id) {
                        return $query->where('user_id', $user_id); // user_id スコープを追加
                    })],
        ]);

        // トランザクション開始
        DB::beginTransaction();

        try {
            $flow_id = DB::table('flows')->insertGetId([
                'title' => $validatedData['initialTitle'],
                'url' => $validatedData['initialUrl'],
                'user_id' => $user_id,
            ]);

            // 3つのテーブルに関連レコードを挿入
            foreach (['questions', 'results', 'edges'] as $table) {
                DB::table($table)->insert(['flow_id' => $flow_id]);
            }
            DB::commit();
            return to_route('flow.index', ['id' => $flow_id]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            
            return redirect()->route('dashboard');
        }
    }


    /**
     * アンケートタイトルとアンケートURLの更新
     */
    public function updateFlow(Request $request, $id){
        $user_id = Auth::user()->id;

        $validatedData = $request->validate([
            'editTitle' => ['required', 'string', 'max:50'],
            'editUrl' => [
                'required', 
                'string', 
                'max:15', 
                'alpha_num:ascii',
                Rule::unique('flows', 'url')->where('user_id', $user_id)->ignore($id),
            ],
        ]);

        DB::beginTransaction();
        
        try {
            DB::table('flows')
                ->where('id', $id)
                ->update([
                    'title' => $validatedData['editTitle'],
                    'url' => $validatedData['editUrl'],
                ]);

            DB::commit();
            return to_route('dashboard');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return to_route('dashboard');
        }
    }

    /**
     * アンケートの削除
     */
    public function deleteFlow($id) {
        try {
            $deleted = Flow::destroy($id);
    
            if ($deleted) {
                return response()->json(['message' => '削除成功'], 200);
            } else {
                return response()->json(['error' => '削除対象が見つかりませんでした'], 404);
            }
        } catch (\Exception $e) {
            \Log::error($e->getMessage() . '(errLine.' . $e->getLine() . ')');
            return response()->json(['error' => '削除に失敗しました'], 500);
        }
    }

    /**
     * アンケートの更新
     */
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
                new ProhibitedNames(['admin', 'login']),
                Rule::unique('flows')->where(function ($query) use ($user_id) {
                    return $query->where('user_id', $user_id);
                })->ignore($id),
            ],       
            'first_question_id' => ['required'],            
        ]);

        $params = $request->only(['update_questions','update_results','update_edges','x','y','zoom' ]);

        DB::beginTransaction();
        
        try {
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

            DB::commit();
            return to_route('flow.index', $id);
        }
        catch (\Exception $e) {
            DB::rollBack();
            \Log::error($e->getMessage(). ' (errLine: ' . $e->getLine() . ')');
            return redirect()->back()->withErrors('更新に失敗しました');
        }
    }



    /**
     * 集計取得
     */
    public function getTotalling() {
        $user_id = Auth::user()->id;
        try {
            $flow_records = DB::table('flows')
            ->leftJoin('achievements', 'flows.id', '=', 'achievements.flow_id')
            ->select(
                'flows.id',
                'flows.title',
                DB::raw('COUNT(achievements.id) as total'))
            ->where('flows.user_id', $user_id)
            ->groupBy('flows.id', 'flows.title' )
            ->get();

            $flows = $flow_records ?? [];        
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage() . ' (errLine: ' . $e->getLine() . ')');
            $flows = []; // エラー時のデフォルト値
        }
        return Inertia::render('Owner/Totalling/Totalling', [
            'flows' => $flows
        ]);
    }


    /**
     * グラフ情報取得
     */
    public function getGraphData($id) {
        try {

            $achievement_records = DB::table('achievements')
            ->select(
                'result',
                DB::raw('COUNT(result) as total'))
            ->where('flow_id', $id)
            ->groupBy('result')
            ->get();

            $labels = $achievement_records->pluck('result')->toArray();
            $datas = $achievement_records->pluck('total')->toArray();

        }
        catch (\Exception $e) {
            \Log::error($e->getMessage() . ' (errLine: ' . $e->getLine() . ')');
        
            // エラー時は空のラベルとデータを返す
            $labels = [];
            $datas = [];
        }

        return response()->json([
            'labels' =>  $labels,
            'datas' => $datas,
        ],200,[],JSON_UNESCAPED_UNICODE);
    }
}
