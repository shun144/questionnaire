<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initEdgeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('edges')->insert([
            [
                'board_id' => 1,
                'edge_datas' => json_encode([
                    [
                        "id"=> "e-1",
                        "type"=> "smoothstep",
                        "source"=> "q-1",
                        "sourceHandle"=> "q-1_1",
                        "target"=> "r-1",
                        "targetHandle"=> "r-1",
                    ],
                ],JSON_UNESCAPED_UNICODE)
            ]
        ]);


        
    }
}
