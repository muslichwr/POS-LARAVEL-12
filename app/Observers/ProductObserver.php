<?php

namespace App\Observers;

use App\Models\Log;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product)
    {
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
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product)
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'update',
            'model' => 'Product',
            'model_id' => $product->id,
            'description' => "Product '{$product->name}' has been updated.",
            'changes' => $product->getChanges(), // Catat perubahan data
            'ip_address' => Request::ip(),
            'user_agent' => Request::header('User-Agent'),
        ]);
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product)
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'delete',
            'model' => 'Product',
            'model_id' => $product->id,
            'description' => "Product '{$product->name}' has been deleted.",
            'changes' => null,
            'ip_address' => Request::ip(),
            'user_agent' => Request::header('User-Agent'),
        ]);
    }
}