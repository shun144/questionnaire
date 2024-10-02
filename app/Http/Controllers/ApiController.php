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

use App\Models\Quize;
use GuzzleHttp\Client;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{

    /**
     * $keyで昇順ソートする
     */
    private function sortAscArrayByKey(&$array, $key) {
        $arrayCols = array_column($array, $key);
        array_multisort($arrayCols, SORT_ASC, $array);               
    }

    private function getShukkinDayForOneWeek() {
        $client = new Client();

        // 週間出勤情報取得API
        $API_SHUKKIN_LIST = "http://api.cityheaven.net/ApiShukkinList.php";
        $resApiShukkin = $client->post($API_SHUKKIN_LIST,
            [
                'form_params' => [
                    'keyid' => '4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo',
                    'shopid' => '1500000311',
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

    private function getAllGirls() {
        $client = new Client();
        // 在籍女の子一覧API
        $API_GIRLS_LIST = "http://api.cityheaven.net/ApiGirlsList.php";
        $resApiGirls = $client->post($API_GIRLS_LIST,
            [
                'form_params' => [
                    'keyid' => '4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo',
                    'shopid' => '1500000311',
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

    // public function testCallApi() {
    //     try {
    //         $responses = Http::pool(fn (Pool $pool) => [
    //             $pool->asForm()->post('http://api.cityheaven.net/ApiShukkinList.php', [
    //                 'keyid' => '4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo',
    //                 'shopid' => '1500000311',
    //                 'mode' => '0',
    //                 'base_day' => date("Ymd")
    //             ]),
    //             $pool->asForm()->post('http://api.cityheaven.net/ApiGirlsList.php', [
    //                 'keyid' => '4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo',
    //                 'shopid' => '1500000311',
    //             ]),
    //         ]);

    //         $data = [
    //             'first' => simplexml_load_string($responses[0]->getBody()),
    //             'second' => simplexml_load_string($responses[1]->getBody())
    //         ];
    //         return response()->json($data);
    //     } catch (\Exception $e) {
    //         $data = [
    //             'err' => $e->getMessage()
    //         ];
    //     }
    // }




    public function testCallApi() {

        try {                    
            // ①当日出勤している
            // ②チェック項目に一致している数が多い
            // ③写メ日記がある
            // ④口コミがある
            // ⑤直近1週間以内に出勤予定がある。

            // 「名前」「キャッチ」「URL」「スリーサイズ」

            $shukkinArray = $this->getShukkinDayForOneWeek();
            $this->sortAscArrayByKey($shukkinArray, 'id');
            
            $girlsArray =  $this->getAllGirls();
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


    public function get()
    {
        return response()->json(
            [
                "quize" => [
                    [
                        "quizeNo" => "quize-1",
                        "topic" => "好きな動物は？",
                        "x" => "0",
                        "y" => "0",
                        "choices" => [
                            [
                                "choiceNo" => "quize-1-1",
                                "content" => "犬"
                            ],
                            [
                                "choiceNo" => "quize-1-2",
                                "content" => "猫"
                            ],
                            [
                                "choiceNo" => "quize-1-3",
                                "content" => "うさぎ"
                            ],
                            [
                                "choiceNo" => "quize-1-4",
                                "content" => "馬"
                            ],
                        ],
                    ],
                    [
                        "quizeNo" => "quize-2",
                        "topic" => "好きな動物は？",
                        "x" => "0",
                        "y" => "0",
                        "choices" => [
                            [
                                "choiceNo" => "quize-2-1",
                                "content" => "犬"
                            ],
                            [
                                "choiceNo" => "quize-2-2",
                                "content" => "猫"
                            ],
                            [
                                "choiceNo" => "quize-2-3",
                                "content" => "うさぎ"
                            ],
                            [
                                "choiceNo" => "quize-2-4",
                                "content" => "馬"
                            ],
                        ],
                    ],
                ]
            ]
        );

        // return response()->json(
        //     [
        //         "quizeNo" => "quize-1",
        //         "topic" => "好きな動物は？",
        //         "x" => "0",
        //         "y" => "0",
        //         "choices" => [
        //             [
        //                 "choiceNo" => "quize-1-1",
        //                 "content" => "犬"
        //             ],
        //             [
        //                 "choiceNo" => "quize-1-2",
        //                 "content" => "猫"
        //             ],
        //             [
        //                 "choiceNo" => "quize-1-3",
        //                 "content" => "うさぎ"
        //             ],
        //             [
        //                 "choiceNo" => "quize-1-4",
        //                 "content" => "馬"
        //             ],
        //         ],
        //     ],
        // );

        // return response()->json(
        //     [
        //         "quize" => [
        //             "quizeNo" => "quize-1",
        //             "topic" => "好きな動物は？",
        //             "choices" => [
        //               [
        //                 "choiceNo" => "quize-1-1",
        //                 "content" => "犬"
        //               ],
        //             ]
        //         ]

        //     ],
        // );

    
        // return response()->json(
        //     [
        //      "post" => [
        //           [
        //        "id" => 1,
        //            "title" => "タイトルです",
        //            "content" => "投稿内容です投稿内容です投稿内容です投稿内容です投稿内容です。"
        //           ],
        //           [
        //        "id" => 2,
        //            "title" => "タイトルです",
        //            "content" => "投稿内容です投稿内容です投稿内容です投稿内容です投稿内容です。"
        //           ],
        //           [
        //        "id" => 3,
        //            "title" => "タイトルです",
        //            "content" => "投稿内容です投稿内容です投稿内容です投稿内容です投稿内容です。"
        //           ],
        //         ]
        //     ],
        //     200,[],
        //     JSON_UNESCAPED_UNICODE //文字化け対策
        // );



        // $store_id = Auth::user()->store_id;
        // $lines = DB::table('lines')
        // ->select('id','user_name', 'is_valid','created_at')
        // ->whereNull('deleted_at')
        // ->where('store_id', $store_id)
        // ->orderBy('created_at')
        // ->get();
        // $url_name = DB::table('stores')->find($store_id)->url_name;



        // $request->user()->fill($request->validated());

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

        // $request->user()->save();

        // return Redirect::route('profile.edit');
    }
}
