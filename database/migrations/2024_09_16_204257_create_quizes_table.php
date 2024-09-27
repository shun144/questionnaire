<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quizes', function (Blueprint $table) {
            $table->string('quize_no',15)->primary();
            $table->string('topic')->nullable();
            $table->float('x', 9, 5)->nullable();   // 総桁9の小数点以下5桁以内
            $table->float('y', 9, 5)->nullable();   // 総桁9の小数点以下5桁以内
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizes');
    }
};
