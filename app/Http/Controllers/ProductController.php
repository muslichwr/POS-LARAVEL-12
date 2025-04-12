<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Admin/Product/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Product/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string|max:500',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'category' => 'nullable|max:100',
        ]);

        $product = Product::create($validated);

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'create',
            'model' => 'Product',
            'model_id' => $product->id,
            'description' => "Product '{$product->name}' has been created.",
            'changes' => null,
            'ip_address' => Request::ip(),
            'user_agent' => Request::header('User-Agent'),
        ]);

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string|max:500',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'category' => 'nullable|max:100',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus');
    }
}