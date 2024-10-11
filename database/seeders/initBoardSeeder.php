<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initBoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('boards')->insert([
            [
                'user_id'   => 1,
                'title'     => 'サンプルタイトル',
                'type'      => 'Custom',
            ],
        ]);
    }
}
