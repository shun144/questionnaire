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
use Inertia\Inertia;

class OwnerContoller extends Controller
{

    // private function getBoardIdBySessionUser() {
    //     $user_id = Auth::user()->id;
    //     $board_id = Board::where('user_id',$user_id)->first()->id;
    //     return $board_id;
    // }

    public function getFlowTitleAndUrl(Request $request){
        try {
            $params = $request->only(['flow_id']);
            
            $records = DB::table('flows')
            ->where('id', $params['flow_id'])
            ->select('title', 'url')
            ->first();

            $data = isset($records) ? [
                'title' => $records->title,
                'url' => $records->url,
            ]: [];
    
            return response()->json($records,200,[],JSON_UNESCAPED_UNICODE);
        }
        catch (\Exception $e) {

            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }


    public function getFirstQuestionId(Request $request){
        try {
            // $board_id = $this->getBoardIdBySessionUser();
            $params = $request->only([
                'flow_id',
            ]);
           
            $record = DB::table('flows')
            ->where('id', $params['flow_id'])
            ->select('first_question_id')
            ->first();

            $data = isset($record) ? $record->first_question_id: '';

            return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);

        }
        catch (\Exception $e) {

            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }




    public function addFlow(Request $request){
        try {
            $params = $request->only([
                'title',
                'category',
                'url',
            ]);
            $user_id = Auth::user()->id;


            $flow_id = DB::table('flows')->insertGetId([
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

            return response()->json($flow_id,200,[],JSON_UNESCAPED_UNICODE);
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

    public function getFlows(){
        try {
            // $board_id = $this->getBoardIdBySessionUser();
            $user_id = Auth::user()->id;
           
            $records = DB::table('flows')
            ->where('user_id', $user_id)
            ->select('id','category', 'title','url', 'first_question_id as firstQuestionId')
            ->get();


            $data = isset($records) ? $records: [];
            return response()->json($data,200,[],JSON_UNESCAPED_UNICODE);

        }
        catch (\Exception $e) {

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
            ->where('flow_id', $params['flow_id'])
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
            // $flow_id = $this->getBoardIdBySessionUser();
            $params = $request->only(['flow_id']);
           
            $records = DB::table('questions')
            ->where('flow_id', $params['flow_id'])
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
            // $flow_id = $this->getBoardIdBySessionUser();
            $params = $request->only(['flow_id']);
           
            $records = DB::table('results')
            ->where('flow_id', $params['flow_id'])
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

    public function commit(Request $request){
        try {
            $params = $request->only([
                'flow_id',
                'update_questions',
                'update_results',
                'update_edges',
                'first_question_id',
                'title',
                'url'
            ]);

            DB::table('questions')
            ->where('flow_id', $params['flow_id'])
            ->update([
                'node_datas' => $params['update_questions'],
            ]);

            DB::table('results')
            ->where('flow_id', $params['flow_id'])
            ->update([
                'node_datas' => $params['update_results'],
            ]);

            DB::table('edges')
            ->where('flow_id', $params['flow_id'])
            ->update([
                'edge_datas' => $params['update_edges'],
            ]);

            DB::table('flows')
            ->where('id', $params['flow_id'])
            ->update([
                'first_question_id' => $params['first_question_id'],
                'title' => $params['title'],
                'url' => $params['url'],
            ]);

            return response()->json(['title' => $params['title']],200,[],JSON_UNESCAPED_UNICODE);
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

}
