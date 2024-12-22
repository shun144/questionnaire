<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class RespondentController extends Controller
{

    /**
     * 診断内容を取得
     */
    public function getQuestionnair($owner, $flowUrl){
        try {
            $user_record = DB::table('users')
            ->where('english_name', $owner)
            ->select('id', 'name')
            ->first();

            // オーナーが存在しないならNotFoundページを表示
            if (is_null($user_record)) {
                return Inertia::render('Respondent/questionnarie/components/NotFound');
            }

            $flow_record = DB::table('flows')
            ->where([
                ['user_id', $user_record->id],
                ['url', $flowUrl],
            ])
            ->select('id', 'first_question_id', 'title')
            ->first();

            // アンケートが存在しないならNotFoundページを表示
            if (is_null($flow_record)) {
                return Inertia::render('Respondent/questionnarie/components/NotFound');
            }

            $flow_id = $flow_record->id;
            $title = $flow_record->title;
            $first_question_id = $flow_record->first_question_id;

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

            // アンケートが未完成ならNotFoundページを表示
            if (is_null($questions) or is_null($edges)  or is_null($results) or is_null($first_question_id)   ) {
                return Inertia::render('Respondent/questionnarie/components/NotFound');
            }

            return Inertia::render('Respondent/questionnarie/Questionnaire', [
                'ownerName' => $user_record->name,
                'title' => $title,
                'questions' => $questions,
                'results' => $results,
                'edges' => $edges,
                'firstQuestionId' => $first_question_id,
            ]);
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return Inertia::render('Respondent/questionnarie/components/NotFound');
        }
    }

    /**
     * 回答実績登録
     */
    public function addAchievement($owner, $flowUrl, Request $request){
        try {

            $user_record = DB::table('users')
            ->where('english_name', $owner)
            ->select('id', 'name')
            ->first();


            // オーナーが存在しないなら終了
            if (is_null($user_record)) {
                return;
            }

            $flow_record = DB::table('flows')
            ->where([
                ['user_id', $user_record->id],
                ['url', $flowUrl],
            ])
            ->select('id')
            ->first();

            // アンケートが存在しないなら終了
            if (is_null($flow_record)) {
                return;
            }

            $params = $request->only(['result']);

            DB::table('achievements')->insert([
                'flow_id' => $flow_record->id,
                'result' =>  $params['result'],
                'created_at' => Carbon::now(),
            ]);
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
        }
    }
}
