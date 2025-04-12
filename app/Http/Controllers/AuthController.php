<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    
    public function admin(): Response
    {
        // Ambil statistik untuk admin
        $statistics = $this->getAdminStatistics();

        return Inertia::render('Admin/Dashboard', [
            'statistics' => $statistics,
        ]);
    }

    public function cashier(): Response
    {
        $recentTransactions = $this->getCashier();

        return Inertia::render('Cashier/Dashboard', [
            'recentTransactions' => $recentTransactions,
        ]);
    }

    public function user(): Response
    {
        $userTransactions = $this->getUser();

        return Inertia::render('User/Dashboard', [
            'userTransactions' => $userTransactions,
        ]);    
    }

    private function getUser()
    {
        $userTransactions = DB::table('transactions')
        ->where('user_id', auth()->id())
        ->select('id', 'total_amount', 'payment_status', 'created_at')
        ->orderByDesc('created_at')
        ->limit(5)
        ->get();
    }

    private function getCashier()
    {
        $recentTransactions = DB::table('transactions')
        ->select('id', 'total_amount', 'payment_status', 'created_at')
        ->orderByDesc('created_at')
        ->limit(5)
        ->get();
    }

    private function getAdminStatistics()
    {
        // Total penjualan bulanan
        $monthlySales = DB::table('transactions')
            ->select(DB::raw('DATE_TRUNC(\'month\', created_at) as month'), DB::raw('SUM(total_amount) as total_sales'))
            ->where('payment_status', 'paid')
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get();

        // Jumlah transaksi yang berhasil
        $successfulTransactions = DB::table('transactions')
            ->where('payment_status', 'paid')
            ->count();

        // Produk paling laris
        $bestSellingProducts = DB::table('transaction_items')
            ->join('products', 'transaction_items.product_id', '=', 'products.id')
            ->select('products.name', DB::raw('SUM(transaction_items.quantity) as total_quantity'))
            ->groupBy('products.name')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->get();

        // Status stok produk
        $stockStatus = DB::table('products')
            ->select('name', 'stock_quantity')
            ->orderBy('stock_quantity', 'asc')
            ->limit(10)
            ->get();

        return [
            'monthly_sales' => $monthlySales,
            'successful_transactions' => $successfulTransactions,
            'best_selling_products' => $bestSellingProducts,
            'stock_status' => $stockStatus,
        ];
    }
}
