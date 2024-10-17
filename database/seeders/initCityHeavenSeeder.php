<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initCityHeavenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('city_heavens')->insert([
            'access_key' => '4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo',
            'shop_id' => '1500000311',
            'user_id' => '1',
        ]);
    }
}
