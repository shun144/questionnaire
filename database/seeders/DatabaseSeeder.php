<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Admin::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
        ]);
        
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // $this->call([
        //     initFlowSeeder::class,
        //     initQuestionSeeder::class,
        //     initResultSeeder::class,
        //     initEdgeSeeder::class,
        //     initCityHeavenSeeder::class,
        // ]);

    }
}
