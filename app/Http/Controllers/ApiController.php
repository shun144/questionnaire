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


class ApiController extends Controller
{
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
