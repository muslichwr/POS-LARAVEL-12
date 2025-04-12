<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('logs', function (Blueprint $table) {
            // Tambahkan kolom baru
            $table->string('model')->nullable()->after('action'); // Nama model yang terkait
            $table->unsignedBigInteger('model_id')->nullable()->after('model'); // ID dari model yang terkait
            $table->json('changes')->nullable()->after('model_id'); // Perubahan data (sebelum & sesudah)
            $table->ipAddress('ip_address')->nullable()->after('changes'); // IP address pengguna
            $table->string('user_agent')->nullable()->after('ip_address'); // User agent browser
        });
    }

    public function down()
    {
        Schema::table('logs', function (Blueprint $table) {
            // Hapus kolom jika rollback dilakukan
            $table->dropColumn(['model', 'model_id', 'changes', 'ip_address', 'user_agent']);
        });
    }
};
