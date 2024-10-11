<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initQuestionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('questions')->insert([
            [
                'board_id' => 1,
                'node_datas' => json_encode([
                    [
                        "id"=> "q-2",
                        "position"=> [
                            "x"=> 195,
                            "y"=> 120
                        ],
                        "data"=> [
                            "topic"=> "手動変更",
                            "choices"=> [
                                [
                                    "id"=> "q-2_1",
                                    "content"=> "春"
                                ],
                                [
                                    "id"=> "q-2_2",
                                    "content"=> "夏"
                                ],
                                [
                                    "id"=> "q-2_4",
                                    "content"=> "冬"
                                ]
                            ]
                        ],
                        "type"=> "questionNode",
                        "dragHandle"=> ".custom-drag-handle",
                        "measured"=> [
                            "width"=> 256,
                            "height"=> 235
                        ]
                    ],
                    [
                        "id"=> "aac009b7-9203-456d-8135-e237f65cb64a",
                        "position"=> [
                            "x"=> -405,
                            "y"=> 180
                        ],
                        "data"=> [
                            "topic"=> "aaaa",
                            "choices"=> [
                                [
                                    "id"=> "8aab4748-bef0-42b3-9246-64413551df18",
                                    "content"=> "bbb",
                                ]
                            ]
                        ],
                        "type"=> "questionNode",
                        "dragHandle"=> ".custom-drag-handle",
                        "measured"=> [
                            "width"=> 256,
                            "height"=> 136
                        ]
                    ],
                    [
                        "id"=> "b890283f-5ce0-473a-8332-bcff560d7114",
                        "position"=> [
                            "x"=> -360,
                            "y"=> 510
                        ],
                        "data"=> [
                            "topic"=> "test",
                            "choices"=> [
                                [
                                    "id"=> "d3d842a0-2ffc-447a-8879-914c3581ed57",
                                    "content"=> "aaa"
                                ]
                            ]
                        ],
                        "type"=> "questionNode",
                        "dragHandle"=> ".custom-drag-handle",
                        "measured"=> [
                            "width"=> 256,
                            "height"=> 136
                        ]
                    ]
                    
                ], JSON_UNESCAPED_UNICODE),
            ]
        ]);
    }
}
