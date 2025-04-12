<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Pastikan pengguna sudah login
        if (!Auth::check()) {
            return Inertia::render('Error/Unauthorized')->toResponse($request);
        }

        // Jika pengguna adalah admin, berikan akses penuh tanpa memeriksa roles
        if (Auth::user()->role === 'admin') {
            return $next($request);
        }

        // Periksa apakah role pengguna sesuai dengan salah satu role yang diizinkan
        if (!in_array(Auth::user()->role, $roles)) {
            return Inertia::render('Error/Unauthorized')->toResponse($request);
        }

        return $next($request);
    }
}
