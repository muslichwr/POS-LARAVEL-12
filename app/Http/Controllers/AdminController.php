<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function logs()
    {
        $logs = Log::with('user')
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Admin/Logs', [
            'logs' => $logs,
        ]);
    }
}
