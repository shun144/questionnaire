<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Fluent;
use App\Http\Requests\CityHeavenRequest;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;
use App\Models\CityHeaven;



class CityHeavenController extends Controller
{



    public function getCityHeavenGirls($owner) {

        $user_record = DB::table('users')->where('english_name', $owner)->select('id')->first();

        if (is_null($user_record)) {
            return response()->json( ['message' => 'データが見つかりませんでした。' ], 404);
        }

        $cityheaven_record = DB::table('city_heavens')->where('user_id', $user_record->id)->select('access_key', 'shop_id')->first();
        
        if (is_null($cityheaven_record)) {
            return response()->json( ['message' => 'データが見つかりませんでした。' ], 404);
        }

        $decrypted_access_key = Crypt::decryptString($cityheaven_record->access_key);
        $decrypted_shop_id = Crypt::decryptString($cityheaven_record->shop_id);

        $resShukkin = $this->getShukkinDayForOneWeek($decrypted_access_key,$decrypted_shop_id);  
        if (isset($resShukkin['error_message'])) {
            $status_code = $resShukkin['status_code'];
            $error_message = $resShukkin['error_message'];
            \Log::error("シティヘブン出勤API Error (Status: $status_code): $error_message");
            return response()->json(['message' => "APIエラーが発生しました"], 500);
        }
        
        $resGirls = $this->getAllGirls($decrypted_access_key,$decrypted_shop_id);  

        if (isset($resGirls['error_message'])) {
            $status_code = $resGirls['status_code'];
            $error_message = $resGirls['error_message'];
            \Log::error("シティヘブン女の子情報API Error (Status: $status_code): $error_message");
            return response()->json(['message' => "APIエラーが発生しました"], 500);
        }
        

        $girlsData = [];
        $keys = array_keys($resShukkin);
        foreach ($keys as $key) {
            $girlInfo = $resGirls[$key];
            $oneWeekInfo = $resShukkin[$key];

            $girlsData[] = [
                'id' => $girlInfo['id'],
                'name' => $girlInfo["name"],
                'catchphrase' => $girlInfo["catchphrase"],
                'bwh' => $girlInfo["bwh"],
                'diary_flg' => $girlInfo["diary_flg"],
                'review_flg' => $girlInfo["review_flg"],
                'mypage_url' => $girlInfo["girls_url"],
                'yoyaku_url' => $girlInfo["girls_yoyaku_url"],
                'picture_url' => $girlInfo["picture_url"],
                'salespoint_ids'=> $girlInfo["girls_salespoint_ids"],
                'w_shukkin' => $oneWeekInfo["w_shukkin"],
                'today_work_flg' => $oneWeekInfo["w_shukkin"][0] == date("Ymd"),
                'earn_point' => 0,
            ];
        }

        return response()->json(['girlsData' => $girlsData], 200);
    }



    private function getShukkinDayForOneWeek($access_key, $shop_id) {

        $client = new Client();
        $API_SHUKKIN_LIST = env('CITY_HEAVEN_API_SHUKKIN_LIST', "");

        try {
            $res = $client->post($API_SHUKKIN_LIST,
                [
                    'form_params' => [
                        'keyid' => $access_key,
                        'shopid' => $shop_id,
                        'mode' => '0',
                        'base_day' => date("Ymd")
                    ]
                ]
            );

            $xml = simplexml_load_string($res->getBody());

            if (isset($xml->error)) {
                return [
                    'status_code' => 500,
                    'error_message' => (string)$xml->error->message[0]
                ];
            }

            $data = [];
            foreach (json_decode(json_encode($xml->xpath('//girls')), true) as $work) {

                 // 今日から一週間以内の出勤日の配列を取得(一週間全て欠勤の場合、全てnullの配列を返す)
                $data[] = [
                    'id' => $work["girls_id"],
                    'w_shukkin' =>  array_values(
                        array_map(
                            function($value) {
                                // day_off_flgが'0'なら出勤
                                if ($value['day_off_flg'] === '0') return $value['year'].$value['month'].sprintf('%02d', $value['day']);
                            }, $work["w_shukkin"]
                        ), 
                    )
                ];
            };

            $this->sortAscArrayByKey($data, 'id');
            return $data;
        }
        catch (RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
                $statusCode = $response->getStatusCode();
                $errorBody = json_decode($response->getBody()->getContents(), true);
                $errorMessage = $errorBody['message'] ?? 'Unknown error occurred';
                return [
                    'status_code' => $statusCode,
                    'error_message' => $errorMessage,
                ];
            } else {
                return [
                    'status_code' => 500,
                    'error_message' => 'Network error or no response received.',
                ];
            }
        }
    }


    private function getAllGirls($access_key, $shop_id) {
        $client = new Client();
        $API_GIRLS_LIST = env('CITY_HEAVEN_API_GIRLS_LIST', "");

        try {
            $res = $client->post($API_GIRLS_LIST,
                [
                    'form_params' => [
                        'keyid' => $access_key,
                        'shopid' => $shop_id,
                    ]
                ]
            );

            $xml = simplexml_load_string($res->getBody());

            if (isset($xml->error)) {
                return [
                    'status_code' => 500,
                    'error_message' => (string)$xml->error->message[0]
                ];
            }

            $data = [];
            foreach (json_decode(json_encode($xml->xpath('//girlslist')), true) as $girl) {
                $data[] = [
                    'id' => $girl["girls_id"],
                    'name' => $girl["name"],
                    'catchphrase' => $girl["girls_catch"],
                    'bwh' => [$girl["bust"], $girl["waist"], $girl["hip"]],
                    'diary_flg' => $girl["diary_flg"] == '1' ? TRUE : FALSE,
                    'review_flg' => $girl["girls_review_flg"] == '1' ? TRUE : FALSE,
                    'girls_url' => $girl["girls_url"],
                    'girls_yoyaku_url' => $girl["girls_yoyaku_url"],
                    'picture_url' => $girl["picture1"],
                    'girls_salespoint_ids' => array_map(
                        function($num) use($girl){
                            return empty($girl["girls_salespoint_id".sprintf('%02d', $num)]) ? null : $girl["girls_salespoint_id".sprintf('%02d', $num)];
                         },range(1, 20)) // 「ヘブンAPI設計_女の子_リクエスト_レスポンス.xls」にて女の子一人につき"girls_salespoint_id"は最大20項目設定可能
                ];
            };

            $this->sortAscArrayByKey($data, 'id');
            return $data;
        }
        catch (RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
                $statusCode = $response->getStatusCode();
                $errorBody = json_decode($response->getBody()->getContents(), true);
                $errorMessage = $errorBody['message'] ?? 'Unknown error occurred';
                return [
                    'status_code' => $statusCode,
                    'error_message' => $errorMessage,
                ];
            } else {
                return [
                    'status_code' => 500,
                    'error_message' => 'Network error or no response received.',
                ];
            }
        }
    }


    // $keyで昇順ソートする
    private function sortAscArrayByKey(&$array, $key) {
        $arrayCols = array_column($array, $key);
        array_multisort($arrayCols, SORT_ASC, $array);               
    }



    /**
     * APIの資格情報更新
     */
    public function update(CityHeavenRequest $request): RedirectResponse
    {
        $params = $request->only(['access_key', 'shop_id']);

        $user_id = Auth::user()->id;
        $now = Carbon::now();

        try {

            $encrypted_access_key = Crypt::encryptString($params['access_key']);
            $encrypted_shop_id =  Crypt::encryptString($params['shop_id']);
    
            $masked_access_key = $this->maskString($params['access_key'],2);
            $masked_shop_id =  $this->maskString($params['shop_id'], 2);
    
            if (DB::table('city_heavens')->where('user_id', $user_id)->exists()) {
    
                DB::table('city_heavens')
                ->where('user_id', $user_id)
                ->update([
                    'access_key' => $encrypted_access_key,
                    'shop_id' => $encrypted_shop_id,
                    'masking_access_key' => $masked_access_key,
                    'masking_shop_id' => $masked_shop_id,
                    'updated_at' => $now,
                ]);
            } else {
                DB::table('city_heavens')->insert([
                    'access_key' => $encrypted_access_key,
                    'shop_id' => $encrypted_shop_id,
                    'masking_access_key' => $masked_access_key,
                    'masking_shop_id' => $masked_shop_id,
                    'user_id' => $user_id,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
            // return Redirect::route('setting');
            return to_route('setting');
        } catch (\Exception $e) {
            \Log::error($e->getMessage() . '(errLine.' . $e->getLine() . ')');
            return to_route('setting');
        }
    }


    /**
     * APIの資格情報更新
     */
    public function delete(): RedirectResponse
    {
        $user_id = Auth::user()->id;

        try {
            $deleted = CityHeaven::where('user_id', $user_id)->delete();

            if ($deleted) {
                return to_route('setting')->with('success', '資格情報を削除しました');
            } else {
                return to_route('setting')->with('fail', '削除対象の資格情報が見つかりませんでした');
            }

        } catch (\Exception $e) {
            \Log::error($e->getMessage() . '(errLine.' . $e->getLine() . ')');
            return to_route('setting');
        }
    }


    private function maskString($string, $keepLength=3):string {
        return "..." . substr($string, -1 * ($keepLength));
    }

}
