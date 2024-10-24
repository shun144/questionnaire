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
                'flow_id' => 1,
                'node_datas' => json_encode([], JSON_UNESCAPED_UNICODE),
            ]
        ]);
    }
}
