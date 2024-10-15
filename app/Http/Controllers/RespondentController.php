<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Http;

class RespondentController extends Controller
{
    public function getFirstQuestionId(Request $request){
        try {
            // $board_id = $this->getBoardIdBySessionUser();
            $params = $request->only([
                'flow_url',
            ]);
           
            $record = DB::table('flows')
            ->where('url', $params['flow_url'])
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

    public function getQuestionnair(Request $request){
        try {

            $flow_url = $request->only(['flow_url']);
    
            $flow_id = DB::table('flows')->where('url', $flow_url)->value('id');

            $questions_record = DB::table('questions')
            ->where('flow_id', $flow_id)
            ->select('node_datas')
            ->first();

            $results_record = DB::table('results')
            ->where('flow_id', $flow_id)
            ->select('node_datas')
            ->first();

            $edges_record = DB::table('edges')
            ->where('flow_id', $flow_id)
            ->select('edge_datas')
            ->first();

            $questions = isset($questions_record) ? $questions_record->node_datas: [];
            $results = isset($results_record) ? $results_record->node_datas: [];
            $edges = isset($edges_record) ? $edges_record->edge_datas: [];

            $data = [
                'questions' => $questions,
                'results' => $results,
                'edges' => $edges,
            ];

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
