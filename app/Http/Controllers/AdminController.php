<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function getStatistics(Request $request)
    {
        // Total penjualan bulanan
        $monthlySales = DB::table('transactions')
            ->select(DB::raw('DATE_TRUNC(\'month\', created_at) as month'), DB::raw('SUM(total_amount) as total_sales'))
            ->where('payment_status', 'paid')
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(12) // Ambil 12 bulan terakhir
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
            ->limit(5) // Ambil 5 produk terlaris
            ->get();

        // Status stok produk
        $stockStatus = DB::table('products')
            ->select('name', 'stock_quantity')
            ->orderBy('stock_quantity', 'asc') // Urutkan berdasarkan stok terendah
            ->limit(10) // Ambil 10 produk dengan stok terendah
            ->get();

        return response()->json([
            'monthly_sales' => $monthlySales,
            'successful_transactions' => $successfulTransactions,
            'best_selling_products' => $bestSellingProducts,
            'stock_status' => $stockStatus,
        ]);
    }
}
