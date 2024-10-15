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
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class ApiController extends Controller
{

    public function getCityHeavenGirls() {
        try {                    

            $cityheaven_credential = DB::table('city_heavens')
            ->where('user_id', 1)->select('access_key', 'shop_id')->first();

            $decrypted_access_key = Crypt::decryptString($cityheaven_credential->access_key);
            $decrypted_shop_id = Crypt::decryptString($cityheaven_credential->shop_id);

            $shukkinArray = $this->getShukkinDayForOneWeek(
                $decrypted_access_key,
                $decrypted_shop_id,
            );            
            $this->sortAscArrayByKey($shukkinArray, 'id');
            
            $girlsArray = $this->getAllGirls(
                $decrypted_access_key,
                $decrypted_shop_id,
            );

            $this->sortAscArrayByKey($girlsArray, 'id');
    
            $resultArray = [];
            $keys = array_keys($shukkinArray);

            $todayYYYYMMDD = date("Ymd");
            foreach ($keys as $key) {
                $girlInfo = $girlsArray[$key];
                $oneWeekInfo = $shukkinArray[$key];

                $resultArray[] = [
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
                    'today_work_flg' => $oneWeekInfo["w_shukkin"][0] == $todayYYYYMMDD,
                    'earn_point' => 0,
                ];
            }


            $data = [
                // 'status' => $resApiGirls->getStatusCode(),
                // 'xml' => $xmlApiGirls,
                // 'girls' => $xmlObject->xpath('//girls')
                // 'shukkinArray' => $shukkinArray,
                // 'girlsArray' => $girlsArray,
                'resultArray' => $resultArray
     
            ];
            return response()->json($data);
        }
        catch (\Exception $e) {
            // \Log::error('エラー機能:即時実行 【店舗ID:'.$store_id.'】');
            \Log::error('エラー箇所:'.$e->getFile().'【'.$e->getLine().'行目】');
            \Log::error('エラー内容:'.$e->getMessage());

            $data = [
                'err' => $e->getMessage()
            ];
            return response()->json($data);
        }
    }


    // $keyで昇順ソートする
    private function sortAscArrayByKey(&$array, $key) {
        $arrayCols = array_column($array, $key);
        array_multisort($arrayCols, SORT_ASC, $array);               
    }

    // 直近1週間に出勤予定の女の子情報を取得
    private function getShukkinDayForOneWeek($access_key, $shop_id) {

        $client = new Client();

        // 週間出勤情報取得API
        $API_SHUKKIN_LIST = "http://api.cityheaven.net/ApiShukkinList.php";
        $resApiShukkin = $client->post($API_SHUKKIN_LIST,
            [
                'form_params' => [
                    'keyid' => $access_key,
                    'shopid' => $shop_id,
                    // 'keyid' => '4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo',
                    // 'shopid' => '1500000311',
                    'mode' => '0',
                    'base_day' => date("Ymd")
                ]
            ]
        );


        $xmlApiShukkin = simplexml_load_string($resApiShukkin->getBody());
        $shukkinArray = [];
        foreach (json_decode(json_encode($xmlApiShukkin->xpath('//girls')), true) as $work) {
            $shukkinArray[] = [
                'id' => $work["girls_id"],
                // 今日から一週間以内の出勤日の配列を取得
                // 一週間全て欠勤の場合、全てnullの配列を返す
                'w_shukkin' =>  array_values(
                    array_map(
                        function($value) {
                            // day_off_flgが'0'なら出勤
                            if ($value['day_off_flg'] === '0') return $value['year'].$value['month'].sprintf('%02d', $value['day']);
                        }, $work["w_shukkin"]
                    ), 
                )

                // 'w_shukkin' =>  array_values(
                //                     array_filter(
                //                         array_map(
                //                             function($value) {
                //                                 // day_off_flgが'0'なら出勤
                //                                 if ($value['day_off_flg'] === '0') return $value['year'].$value['month'].$value['day'];
                //                             }, $work["w_shukkin"]
                //                         ), 
                //                         function($value){
                //                             return !is_null($value);
                //                         }
                //                     )
                //                 )
            ];
        };
        return $shukkinArray;
    }

    private function getAllGirls($access_key, $shop_id) {
        $client = new Client();

        // 在籍女の子一覧API
        $API_GIRLS_LIST = "http://api.cityheaven.net/ApiGirlsList.php";
        $resApiGirls = $client->post($API_GIRLS_LIST,
            [
                'form_params' => [
                    'keyid' => $access_key,
                    'shopid' => $shop_id,
                ]
            ]
        );
        $xmlApiGirls = simplexml_load_string($resApiGirls->getBody());
        $girlsArray = [];
        foreach (json_decode(json_encode($xmlApiGirls->xpath('//girlslist')), true) as $girl) {
            $girlsArray[] = [
                'id' => $girl["girls_id"],
                'name' => $girl["name"],
                'catchphrase' => $girl["girls_catch"],
                'bwh' => [$girl["bust"], $girl["waist"], $girl["hip"]],
                'diary_flg' => $girl["diary_flg"] == '1' ? TRUE : FALSE,
                'review_flg' => $girl["girls_review_flg"] == '1' ? TRUE : FALSE,
                'girls_url' => $girl["girls_url"],
                'girls_yoyaku_url' => $girl["girls_yoyaku_url"],
                'picture_url' => $girl["picture1"],
                'girls_salespoint_ids' => array_map(function($num) use($girl){
                                                        return empty($girl["girls_salespoint_id".sprintf('%02d', $num)]) ? null : $girl["girls_salespoint_id".sprintf('%02d', $num)];
                                                    },range(1, 20))
            ];
        };
        return $girlsArray;
    }
}
