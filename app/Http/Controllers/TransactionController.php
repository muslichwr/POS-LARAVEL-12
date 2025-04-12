<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua transaksi beserta detail pengguna dan kasir
        $transactions = Transaction::with(['user', 'cashier'])->latest()->get();

        return Inertia::render('Cashier/Transaction/Index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ambil daftar pengguna dan kasir untuk dipilih pada form
        $users = User::all();
        $cashiers = User::whereRole('cashier')->get(); // Misalkan ada role untuk kasir
        $products = Product::all();
        $paymentMethods = ['cash', 'credit_card', 'ewallet',]; // Misalnya, dari database


        return Inertia::render('Cashier/Transaction/Create', [
            'users' => $users,
            'cashiers' => $cashiers,
            'products' => $products,
            'paymentMethods' => $paymentMethods,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data yang dikirimkan
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'cashier_id' => 'required|exists:users,id',
            'payment_status' => 'required|in:pending,paid,failed',
            'payment_method' => 'required|in:cash,credit_card,ewallet',
            'items' => 'required|array|min:1', // Pastikan ada minimal 1 item transaksi
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Ambil data item transaksi
        $items = $request->input('items', []);

        // Hitung total amount dari item transaksi
        $totalAmount = collect($items)->reduce(function ($carry, $item) {
            return $carry + ($item['quantity'] * $item['price']);
        }, 0);

        // Buat transaksi baru dengan total amount
        $transaction = Transaction::create([
            'user_id' => $validatedData['user_id'],
            'cashier_id' => $validatedData['cashier_id'],
            'total_amount' => $totalAmount,
            'payment_status' => $validatedData['payment_status'],
            'payment_method' => $validatedData['payment_method'],
        ]);

        // Simpan item transaksi
        foreach ($items as $item) {
            $product = Product::findOrFail($item['product_id']);

            // Kurangi stok produk
            $product->decrement('stock_quantity', $item['quantity']);

            // Simpan item transaksi
            TransactionItem::create([
                'transaction_id' => $transaction->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'], // Harga produk saat transaksi
                'total' => $item['quantity'] * $item['price'],
            ]);
        }

        return redirect()->route('cashier.transactions.index')->with('success', 'Transaksi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Ambil transaksi berdasarkan ID beserta relasi
        $transaction = Transaction::with([
            'user', // Relasi ke pengguna
            'cashier', // Relasi ke kasir
            'transactionItems.product' // Relasi ke item transaksi dan produk
        ])->findOrFail($id);
    
        return Inertia::render('Cashier/Transaction/Show', [
            'transaction' => $transaction,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        throw new \Exception("Fitur ini tidak tersedia.");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        throw new \Exception("Fitur ini tidak tersedia.");
    }

    public function updatePaymentStatus(Request $request, $id)
    {
        // Validasi data yang dikirimkan
        $validatedData = $request->validate([
            'payment_status' => 'required|in:pending,paid,failed',
        ]);

        // Ambil transaksi berdasarkan ID
        $transaction = Transaction::findOrFail($id);

        // Perbarui status pembayaran
        $transaction->update([
            'payment_status' => $validatedData['payment_status'],
        ]);

        return redirect()->route('cashier.transactions.index')->with('success', 'Payment status berhasil diperbarui');
    }

    public function updatePaymentStatusForm($id)
    {
        // Ambil transaksi berdasarkan ID
        $transaction = Transaction::with(['user', 'cashier'])->findOrFail($id);

        return Inertia::render('Cashier/Transaction/UpdatePaymentStatus', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Hapus transaksi berdasarkan ID
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return redirect()->route('cashier.transactions.index')->with('success', 'Transaksi berhasil dihapus');
    }
}