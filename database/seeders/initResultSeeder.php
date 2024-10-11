<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initResultSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('results')->insert([
            [
                'board_id' => 1,
                'node_datas' => json_encode([
                    [
                        "id"=> "aac009b7-9203-456d-8135-e237f65cb64a",
                        "position"=> [
                            "x"=> -405,
                            "y"=> 180
                        ],
                        "data"=> [
                            "result"=> "あなたのタイプはAさんです",
                            "message" => "あなたは真面目なタイプです",
                            "url" => "",
                            "img" => "",
                        ],
                        "type"=> "resultNode",
                        "dragHandle"=> ".custom-drag-handle",
                        "measured"=> [
                            "width"=> 256,
                            "height"=> 136
                        ]
                    ],
                    
                ], JSON_UNESCAPED_UNICODE),
            ]
        ]);
    }
}
