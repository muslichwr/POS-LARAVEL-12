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
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Siapa yang melakukan aktivitas
            $table->string('action'); // Jenis aktivitas (misalnya: "create", "update", "delete")
            $table->string('model')->nullable(); // Nama model yang terkait (misalnya: "Product", "Transaction")
            $table->unsignedBigInteger('model_id')->nullable(); // ID dari model yang terkait
            $table->text('description')->nullable(); // Deskripsi aktivitas
            $table->json('changes')->nullable(); // Perubahan data (sebelum & sesudah)
            $table->ipAddress('ip_address')->nullable(); // IP address pengguna
            $table->string('user_agent')->nullable(); // User agent browser
            $table->timestamps(); // Waktu aktivitas
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
