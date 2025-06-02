<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// |------------------------------------------------
// | import controller
// |------------------------------------------------
use App\Http\Controllers\Dokter\ObatController;

Route::middleware(['auth', 'role:dokter'])->prefix('dokter')->group(function () {
    Route::get(
        '/dashboard',
        fn() =>
        Inertia::render('dokter/dashboard', [
            'user' => \Illuminate\Support\Facades\Auth::user(),
        ])
    )->name('dokter.dashboard');


    Route::prefix('obat')->group(function () {
        Route::get('/', [ObatController::class, 'index'])->name('dokter.obat.index');
        Route::get('/create', [ObatController::class, 'create'])->name('dokter.obat.create');
        Route::post('/', [ObatController::class, 'store'])->name('dokter.obat.store');
        Route::get('/{id}/edit', [ObatController::class, 'edit'])->name('dokter.obat.edit');
        Route::patch('/{id}', [ObatController::class, 'update'])->name('dokter.obat.update');
        Route::delete('/{id}', [ObatController::class, 'destroy'])->name('dokter.obat.destroy');
    });
});
