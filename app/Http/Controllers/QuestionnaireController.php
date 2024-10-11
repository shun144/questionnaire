<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Http;

class QuestionnaireController extends Controller
{
    public function getQuestionnair(){
        try {
            // $board_id = $request->input('board_id');

            $board_id = 1;

            $questions_record = DB::table('questions')
            ->where('board_id', $board_id)
            ->select('node_datas')
            ->first();

            $results_record = DB::table('results')
            ->where('board_id', $board_id)
            ->select('node_datas')
            ->first();

            $edges_record = DB::table('edges')
            ->where('board_id', $board_id)
            ->select('edge_datas')
            ->first();

            $questions = isset($questions_record) ? $questions_record->node_datas: [];
            $results = isset($results_record) ? $results_record->node_datas: [];
            $edges = isset($edges_record) ? $edges_record->edge_datas: [];

            $data = [
                'questions' => $questions,
                'results' => $results,
                'edges' => $edges
            ];
            // $data = [
            //     'sample' => 'aaaa'
            // ];

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
