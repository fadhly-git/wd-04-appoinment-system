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
        Schema::create('janji_periksas', function (Blueprint $table) {
            $table->id();

            // Define the columns before creating foreign keys
            $table->unsignedBigInteger('id_pasien');
            $table->unsignedBigInteger('id_jadwal_periksa');

            // Now set up the foreign keys
            $table->foreign('id_pasien')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_jadwal_periksa')->references('id')->on('jadwal_periksas')->onDelete('cascade');

            $table->text('keluhan');
            $table->integer('no_antrian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('janji_periksas');
    }
};
