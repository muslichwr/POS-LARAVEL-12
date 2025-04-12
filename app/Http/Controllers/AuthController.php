<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    
    public function admin(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function cashier(): Response
    {
        return Inertia::render('Cashier/Dashboard');
    }

    public function user(): Response
    {
        return Inertia::render('User/Dashboard');
    }
}
