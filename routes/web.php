<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Default route untuk redirect ke dashboard berdasarkan role
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif (auth()->user()->role === 'cashier') {
            return redirect()->route('cashier.dashboard');
        } elseif (auth()->user()->role === 'user') {
            return redirect()->route('user.dashboard');
        }
        return abort(403, 'Unauthorized');
    })->name('dashboard');

    // Admin Dashboard
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', [AuthController::class, 'admin'])->name('admin.dashboard');
        Route::get('/admin/user/index', [UserController::class, 'index'])->name('admin.users.index');
        Route::get('/admin/user/create', [UserController::class, 'create'])->name('admin.users.create');
        Route::post('/admin/user', [UserController::class, 'store'])->name('admin.users.store');
        Route::get('/admin/user/edit/{id}', [UserController::class, 'edit'])->name('admin.users.edit');
        Route::put('/admin/user/{id}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/admin/user/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        Route::get('/admin/users/confirm-delete/{id}', [UserController::class, 'confirmDelete'])->name('admin.users.confirm-delete');
        Route::get('/admin/product/index', [ProductController::class, 'index'])->name('admin.products.index');
        Route::get('/admin/product/create', [ProductController::class, 'create'])->name('admin.products.create');
        Route::post('/admin/product', [ProductController::class, 'store'])->name('admin.products.store');
        Route::get('/admin/product/edit/{id}', [ProductController::class, 'edit'])->name('admin.products.edit');
        Route::put('/admin/product/{id}', [ProductController::class, 'update'])->name('admin.products.update');
        Route::delete('/admin/product/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
    });

    // Cashier Dashboard
    Route::middleware(['role:cashier'])->group(function () {
        Route::get('/cashier/dashboard', [AuthController::class, 'cashier'])->name('cashier.dashboard');
        Route::get('/cashier/transaction/index', [TransactionController::class, 'index'])->name('cashier.transactions.index');
        Route::get('/cashier/transaction/create', [TransactionController::class, 'create'])->name('cashier.transactions.create');
        Route::post('/cashier/transaction', [TransactionController::class, 'store'])->name('cashier.transactions.store');
        Route::get('/cashier/transaction/{id}', [TransactionController::class, 'show'])->name('cashier.transactions.show');
        Route::get('/cashier/transaction/edit/{id}', [TransactionController::class, 'edit'])->name('cashier.transactions.edit');
        Route::put('/cashier/transaction/{id}', [TransactionController::class, 'update'])->name('cashier.transactions.update');
        Route::get('/cashier/transaction/{id}/update-payment-status', [TransactionController::class, 'updatePaymentStatusForm'])->name('cashier.transactions.update_payment_status_form');
        Route::put('/cashier/transaction/{id}/update-payment-status', [TransactionController::class, 'updatePaymentStatus'])->name('cashier.transactions.update_payment_status');
        Route::delete('/cashier/transaction/{id}', [TransactionController::class, 'destroy'])->name('cashier.transactions.destroy');
    });

    // User Dashboard
    Route::middleware(['role:user'])->group(function () {
        Route::get('/user/dashboard', [AuthController::class, 'user'])->name('user.dashboard');
    });
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// Route::middleware(['auth', 'verified','role:admin'])->group(function () {
// Route::get('/admin/dashboard',[AuthController::class,'admin'])->name('admin');
// Route::get('/admin/dashboard/statistics', [AdminController::class, 'getStatistics'])
// ->name('admin.dashboard.statistics');
// Route::get('/admin/user/index', [UserController::class, 'index'])->name('admin.users.index');
// Route::get('/admin/user/create', [UserController::class, 'create'])->name('admin.users.create');
// Route::post('/admin/user', [UserController::class, 'store'])->name('admin.users.store');
// Route::get('/admin/user/edit/{id}', [UserController::class, 'edit'])->name('admin.users.edit');
// Route::put('/admin/user/{id}', [UserController::class, 'update'])->name('admin.users.update');
// Route::delete('/admin/user/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');
// Route::get('/admin/users/confirm-delete/{id}', [UserController::class, 'confirmDelete'])->name('admin.users.confirm-delete');
// Route::get('/admin/product/index', [ProductController::class, 'index'])->name('admin.products.index');
// Route::get('/admin/product/create', [ProductController::class, 'create'])->name('admin.products.create');
// Route::post('/admin/product', [ProductController::class, 'store'])->name('admin.products.store');
// Route::get('/admin/product/edit/{id}', [ProductController::class, 'edit'])->name('admin.products.edit');
// Route::put('/admin/product/{id}', [ProductController::class, 'update'])->name('admin.products.update');
// Route::delete('/admin/product/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
// });

// Route::middleware(['auth', 'verified','role:cashier'])->group(function () {
// Route::get('/cashier/dashboard',[AuthController::class,'cashier'])->name('cashier');
// Route::get('/cashier/transaction/index', [TransactionController::class, 'index'])->name('cashier.transactions.index');
// Route::get('/cashier/transaction/create', [TransactionController::class, 'create'])->name('cashier.transactions.create');
// Route::post('/cashier/transaction', [TransactionController::class, 'store'])->name('cashier.transactions.store');
// Route::get('/cashier/transaction/{id}', [TransactionController::class, 'show'])->name('cashier.transactions.show');
// Route::get('/cashier/transaction/edit/{id}', [TransactionController::class, 'edit'])->name('cashier.transactions.edit');
// Route::put('/cashier/transaction/{id}', [TransactionController::class, 'update'])->name('cashier.transactions.update');
// Route::get('/cashier/transaction/{id}/update-payment-status', [TransactionController::class, 'updatePaymentStatusForm'])->name('cashier.transactions.update_payment_status_form');
// Route::put('/cashier/transaction/{id}/update-payment-status', [TransactionController::class, 'updatePaymentStatus'])->name('cashier.transactions.update_payment_status');
// Route::delete('/cashier/transaction/{id}', [TransactionController::class, 'destroy'])->name('cashier.transactions.destroy');
// });

// Route::middleware(['auth', 'verified','role:user'])->group(function () {
//     Route::get('/user/dashboard',[AuthController::class,'user'])->name('user');
//     });


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
