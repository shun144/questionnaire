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
        Schema::create('city_heavens', function (Blueprint $table) {
            $table->id();
            $table->text('access_key')->nullable();
            $table->text('shop_id')->nullable();
            $table->text('masking_access_key')->nullable();
            $table->text('masking_shop_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            // 外部キー設定
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('city_heavens');
    }
};
