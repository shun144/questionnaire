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
                'flow_id' => 1,
                'edge_datas' => json_encode([], JSON_UNESCAPED_UNICODE),
            ]
        ]);


        
    }
}
