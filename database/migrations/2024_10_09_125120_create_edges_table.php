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
        Schema::create('edges', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('flow_id');
            $table->json('edge_datas')->nullable()->default('[]');
            $table->timestamps();
            $table->foreign('flow_id')->references('id')->on('flows')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edges');
    }
};
