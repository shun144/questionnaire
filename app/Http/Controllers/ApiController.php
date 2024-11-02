<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class ApiController extends Controller
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
            \Log::error("API Error (Status: $status_code): $error_message");
            return response()->json(['message' => "データ取得のための必要情報に誤りがあります。"], 500);
        }
        


        $resGirls = $this->getAllGirls("test",$decrypted_shop_id);  
        // $resGirls = $this->getAllGirls($decrypted_access_key, $decrypted_shop_id );

        if (isset($resGirls['error_message'])) {
            $status_code = $resGirls['status_code'];
            $error_message = $resGirls['error_message'];
            \Log::error("API Error (Status: $status_code): $error_message");
            return response()->json(['message' => "データ取得のための必要情報に誤りがあります。"], 500);
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


    // private function getAllGirls($access_key, $shop_id) {
    //     $client = new Client();

    //     // 在籍女の子一覧API
    //     $API_GIRLS_LIST = env('CITY_HEAVEN_API_GIRLS_LIST', "");
    //     $resApiGirls = $client->post($API_GIRLS_LIST,
    //         [
    //             'form_params' => [
    //                 'keyid' => $access_key,
    //                 'shopid' => $shop_id,
    //             ]
    //         ]
    //     );
    //     $xmlApiGirls = simplexml_load_string($resApiGirls->getBody());
    //     $girlsArray = [];
    //     foreach (json_decode(json_encode($xmlApiGirls->xpath('//girlslist')), true) as $girl) {
    //         $girlsArray[] = [
    //             'id' => $girl["girls_id"],
    //             'name' => $girl["name"],
    //             'catchphrase' => $girl["girls_catch"],
    //             'bwh' => [$girl["bust"], $girl["waist"], $girl["hip"]],
    //             'diary_flg' => $girl["diary_flg"] == '1' ? TRUE : FALSE,
    //             'review_flg' => $girl["girls_review_flg"] == '1' ? TRUE : FALSE,
    //             'girls_url' => $girl["girls_url"],
    //             'girls_yoyaku_url' => $girl["girls_yoyaku_url"],
    //             'picture_url' => $girl["picture1"],
    //             'girls_salespoint_ids' => array_map(function($num) use($girl){
    //                                                     return empty($girl["girls_salespoint_id".sprintf('%02d', $num)]) ? null : $girl["girls_salespoint_id".sprintf('%02d', $num)];
    //                                                 },range(1, 20))
    //         ];
    //     };
    //     return $girlsArray;
    // }




    // public function test() {

    //     $client = new Client();
    //     $API_SHUKKIN_LIST = env('CITY_HEAVEN_API_SHUKKIN_LIST', "");

    //     // $access_key = "4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo";
    //     $access_key = "aaaa";
    //     $shop_id = "1500000311";

    //     try {
    //         $res = $client->post($API_SHUKKIN_LIST,
    //             [
    //                 'form_params' => [
    //                     'keyid' => $access_key,
    //                     'shopid' => $shop_id,
    //                     'mode' => '0',
    //                     'base_day' => date("Ymd")
    //                 ]
    //             ]
    //         );


    //         // return [
    //         //     'status_code' => 408,
    //         //     'error_message' =>$res->getBody(),
    //         // ];



    //         $xml = simplexml_load_string($res->getBody());
 

    //         if (isset($xml->error)) {
    //             // error ノードが存在する場合
    //             dd();
    //         } else {
    //             // error ノードが存在しない場合
    //             dd('error ノードは存在しません');
    //         }

    //         // if ($xml->status != 200){                    
    //         //     // $result = 'NG';
    //         //     // array_push($err_list, '['.$line->user_name.']'.$res_body->status.'::'.$res_body->message);                 
    //         // }
        

 
    //         // return [
    //         //     'status_code' => 404,
    //         //     'error_message' => $xml->xpath('//error')[0][0],
    //         // ];


    //         $data = [];
    //         foreach (json_decode(json_encode($xml->xpath('//girls')), true) as $work) {

    //              // 今日から一週間以内の出勤日の配列を取得(一週間全て欠勤の場合、全てnullの配列を返す)
    //             $data[] = [
    //                 'id' => $work["girls_id"],
    //                 'w_shukkin' =>  array_values(
    //                     array_map(
    //                         function($value) {
    //                             // day_off_flgが'0'なら出勤
    //                             if ($value['day_off_flg'] === '0') return $value['year'].$value['month'].sprintf('%02d', $value['day']);
    //                         }, $work["w_shukkin"]
    //                     ), 
    //                 )
    //             ];
    //         };
    //         return $data;
    //     }
    //     catch (RequestException $e) {

    //         // エラー時のレスポンスを取得
    //         if ($e->hasResponse()) {
    //             $response = $e->getResponse();
    //             $statusCode = $response->getStatusCode();
    //             $errorBody = json_decode($response->getBody()->getContents(), true);

    //             // エラーメッセージとエラーコードを取得
    //             $errorMessage = $errorBody['message'] ?? 'Unknown error occurred';
    //             return [
    //                 'status_code' => $statusCode,
    //                 'error_message' => $errorMessage,
    //             ];
    //         } else {
    //             // レスポンスがない場合の処理
    //             return [
    //                 'status_code' => 500,
    //                 'error_message' => 'Network error or no response received.',
    //             ];
    //         }
    //     }

    // }

}


// public function getCityHeavenGirls($owner) {
//     try {                    

//         $user_record = DB::table('users')
//         ->where('english_name', $owner)
//         ->select('id')
//         ->first();

//         if (is_null($user_record)) {
//             return response()->json([
//                 'girlsData' => []
//             ]);
//         }

//         $cityheaven_record = DB::table('city_heavens')
//         ->where('user_id', $user_record->id)
//         ->select('access_key', 'shop_id')->first();


//         if (is_null($cityheaven_record)) {
//             return response()->json([
//                 'girlsData' => []
//             ]);
//         }

//         $decrypted_access_key = Crypt::decryptString($cityheaven_record->access_key);
//         $decrypted_shop_id = Crypt::decryptString($cityheaven_record->shop_id);

//         $shukkinArray = $this->getShukkinDayForOneWeek(
//             $decrypted_access_key,
//             $decrypted_shop_id,
//         );            
//         $this->sortAscArrayByKey($shukkinArray, 'id');
        
//         $girlsArray = $this->getAllGirls(
//             $decrypted_access_key,
//             $decrypted_shop_id,
//         );

//         $this->sortAscArrayByKey($girlsArray, 'id');

//         $girlsData = [];
//         $keys = array_keys($shukkinArray);

//         $todayYYYYMMDD = date("Ymd");
//         foreach ($keys as $key) {
//             $girlInfo = $girlsArray[$key];
//             $oneWeekInfo = $shukkinArray[$key];

//             $girlsData[] = [
//                 'id' => $girlInfo['id'],
//                 'name' => $girlInfo["name"],
//                 'catchphrase' => $girlInfo["catchphrase"],
//                 'bwh' => $girlInfo["bwh"],
//                 'diary_flg' => $girlInfo["diary_flg"],
//                 'review_flg' => $girlInfo["review_flg"],
//                 'mypage_url' => $girlInfo["girls_url"],
//                 'yoyaku_url' => $girlInfo["girls_yoyaku_url"],
//                 'picture_url' => $girlInfo["picture_url"],
//                 'salespoint_ids'=> $girlInfo["girls_salespoint_ids"],
//                 'w_shukkin' => $oneWeekInfo["w_shukkin"],
//                 'today_work_flg' => $oneWeekInfo["w_shukkin"][0] == $todayYYYYMMDD,
//                 'earn_point' => 0,
//             ];
//         }

//         $data = [
//             'girlsData' => $girlsData     
//         ];
//         return response()->json($data);
//     }
//     catch (\Exception $e) {
//         // \Log::error('エラー機能:即時実行 【店舗ID:'.$store_id.'】');
//         \Log::error('エラー箇所:'.$e->getFile().'【'.$e->getLine().'行目】');
//         \Log::error('エラー内容:'.$e->getMessage());
//         $errorData = [
//             'message' => 'データが見つかりませんでした。',
//         ];
//         return response()->json($errorData, 404);


//         // $data = [
//         //     'err' => $e->getMessage()
//         // ];
//         // return response()->json($data);
//     }
// }


// // $keyで昇順ソートする
// private function sortAscArrayByKey(&$array, $key) {
//     $arrayCols = array_column($array, $key);
//     array_multisort($arrayCols, SORT_ASC, $array);               
// }



// private function getAllGirls($access_key, $shop_id) {
//     $client = new Client();

//     // 在籍女の子一覧API
//     $API_GIRLS_LIST = env('CITY_HEAVEN_API_GIRLS_LIST', "");
//     $resApiGirls = $client->post($API_GIRLS_LIST,
//         [
//             'form_params' => [
//                 'keyid' => $access_key,
//                 'shopid' => $shop_id,
//             ]
//         ]
//     );
//     $xmlApiGirls = simplexml_load_string($resApiGirls->getBody());
//     $girlsArray = [];
//     foreach (json_decode(json_encode($xmlApiGirls->xpath('//girlslist')), true) as $girl) {
//         $girlsArray[] = [
//             'id' => $girl["girls_id"],
//             'name' => $girl["name"],
//             'catchphrase' => $girl["girls_catch"],
//             'bwh' => [$girl["bust"], $girl["waist"], $girl["hip"]],
//             'diary_flg' => $girl["diary_flg"] == '1' ? TRUE : FALSE,
//             'review_flg' => $girl["girls_review_flg"] == '1' ? TRUE : FALSE,
//             'girls_url' => $girl["girls_url"],
//             'girls_yoyaku_url' => $girl["girls_yoyaku_url"],
//             'picture_url' => $girl["picture1"],
//             'girls_salespoint_ids' => array_map(function($num) use($girl){
//                                                     return empty($girl["girls_salespoint_id".sprintf('%02d', $num)]) ? null : $girl["girls_salespoint_id".sprintf('%02d', $num)];
//                                                 },range(1, 20))
//         ];
//     };
//     return $girlsArray;
// }

    // // 直近1週間に出勤予定の女の子情報を取得
    // private function getShukkinDayForOneWeek($access_key, $shop_id) {

    //     $client = new Client();

    //     // 週間出勤情報取得API
    //     $API_SHUKKIN_LIST = env('CITY_HEAVEN_API_SHUKKIN_LIST', "");
    //     // $API_SHUKKIN_LIST = "http://api.cityheaven.net/ApiShukkinList.php";
    //     $resApiShukkin = $client->post($API_SHUKKIN_LIST,
    //         [
    //             'form_params' => [
    //                 'keyid' => $access_key,
    //                 'shopid' => $shop_id,
    //                 'mode' => '0',
    //                 'base_day' => date("Ymd")
    //             ]
    //         ]
    //     );


    //     $xmlApiShukkin = simplexml_load_string($resApiShukkin->getBody());
    //     $shukkinArray = [];
    //     foreach (json_decode(json_encode($xmlApiShukkin->xpath('//girls')), true) as $work) {
    //         $shukkinArray[] = [
    //             'id' => $work["girls_id"],
    //             // 今日から一週間以内の出勤日の配列を取得
    //             // 一週間全て欠勤の場合、全てnullの配列を返す
    //             'w_shukkin' =>  array_values(
    //                 array_map(
    //                     function($value) {
    //                         // day_off_flgが'0'なら出勤
    //                         if ($value['day_off_flg'] === '0') return $value['year'].$value['month'].sprintf('%02d', $value['day']);
    //                     }, $work["w_shukkin"]
    //                 ), 
    //             )

    //             // 'w_shukkin' =>  array_values(
    //             //                     array_filter(
    //             //                         array_map(
    //             //                             function($value) {
    //             //                                 // day_off_flgが'0'なら出勤
    //             //                                 if ($value['day_off_flg'] === '0') return $value['year'].$value['month'].$value['day'];
    //             //                             }, $work["w_shukkin"]
    //             //                         ), 
    //             //                         function($value){
    //             //                             return !is_null($value);
    //             //                         }
    //             //                     )
    //             //                 )
    //         ];
    //     };
    //     return $shukkinArray;
    // }