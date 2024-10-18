<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class initCityHeavenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('city_heavens')->insert([
            'access_key' => Crypt::encryptString('4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo'),
            'shop_id' => Crypt::encryptString('1500000311'),
            'user_id' => '1',
        ]);
    }
}
