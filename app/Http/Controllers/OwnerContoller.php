<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

// use App\Http\Requests\ProfileUpdateRequest;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Redirect;
// use Inertia\Inertia;
use Inertia\Response;
use App\Models\Board;
use App\Models\Question;
use App\Models\Choice;
use App\Models\Result;
// use App\Models\Quize;
// use GuzzleHttp\Client;
// use Illuminate\Http\Client\Pool;
// use Illuminate\Support\Facades\Http;

class OwnerContoller extends Controller
{

    // private function getBoardIdBySessionUser() {
    //     $user_id = Auth::user()->id;
    //     $board_id = Board::where('user_id',$user_id)->first()->id;
    //     return $board_id;
    // }

    public function commit(Request $request){
        try {
            // $board_id = $this->getBoardIdBySessionUser();
            $params = $request->only([
                'flow_id',
                'update_questions',
                'update_results',
                'update_edges'
            ]);

            // $update_questions = $request->input('updateQuestions');
            // $updateResults = $request->input('updateResults');
            // $updateEdges = $request->input('updateEdges');

            DB::table('questions')
            ->where('board_id', $params['flow_id'])
            ->update([
                'node_datas' => $params['update_questions'],
            ]);

            DB::table('results')
            ->where('board_id', $board_id)
            ->update([
                'node_datas' => $params['update_results'],
            ]);


            DB::table('edges')
            ->where('board_id', $board_id)
            ->update([
                'edge_datas' => $params['update_edges'],
            ]);

            // return response()->json($updateNodeData,200,[],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e) {
            // \Log::error('エラー機能:即時実行 【店舗ID:'.$store_id.'】');
            // \Log::error('エラー箇所:'.$e->getFile().'【'.$e->getLine().'行目】');
            // \Log::error('エラー内容:'.$e->getMessage());

            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }


    public function getEdges(Request $request){
        try {
            $params = $request->only(['flow_id']);
           
            $records = DB::table('edges')
            ->where('board_id', $params['flow_id'])
            ->select('edge_datas')
            ->first();

            $data = isset($records) ? $records->edge_datas: [];

            return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e) {

            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }

    public function getQuestionNodes(Request $request){
        try {
            // $board_id = $this->getBoardIdBySessionUser();
            $params = $request->only(['flow_id']);
           
            $records = DB::table('questions')
            ->where('board_id', $params['flow_id'])
            ->select('node_datas')
            ->first();

            $data = isset($records) ? $records->node_datas: [];

            return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e) {

            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }

    public function getResultNodes(Request $request){
        try {             
            // $board_id = $this->getBoardIdBySessionUser();
            $params = $request->only(['flow_id']);
           
            $records = DB::table('results')
            ->where('board_id', $params['flow_id'])
            ->select('node_datas')
            ->first();

            $data = isset($records) ? $records->node_datas: [];

            return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e) {
            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }
}
