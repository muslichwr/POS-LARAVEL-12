<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'model',
        'model_id',
        'description',
        'changes',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'changes' => 'array', // Pastikan kolom `changes` di-cast sebagai array
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}