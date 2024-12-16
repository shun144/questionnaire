<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initFlowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('flows')->insert([
            // [
            //     'user_id'   => 1,
            //     'title'     => '好きなもの診断',
            //     'url'       => 'standardUrl',
            //     'first_question_id' => '1'
            // ],
            [
                'user_id'   => 1,
                'title'     => 'シティヘブン診断',
                'url'       => 'cityHeavenUrl',
                'first_question_id' => '1'
            ],
        ]);
    }
}
