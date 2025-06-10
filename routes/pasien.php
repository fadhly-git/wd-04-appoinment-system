<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Pasien\JanjiPeriksaController;
use App\Http\Controllers\Pasien\PeriksaController;

Route::middleware(['auth', 'role:pasien'])->prefix('pasien')->group(function () {
    Route::get(
        '/dashboard',
        fn() =>
        Inertia::render('pasien/dashboard', [
            'user' => \Illuminate\Support\Facades\Auth::user(),
        ])
    )->name('pasien.dashboard');

    Route::prefix('janji-periksa')->group(function () {
        Route::get('/', [JanjiPeriksaController::class, 'index'])->name('pasien.janji-periksa.index');
        Route::post('/', [JanjiPeriksaController::class, 'store'])->name('pasien.janji-periksa.store');
    });

    Route::prefix('periksa')->group(function () {
        Route::get('/', [PeriksaController::class, 'index'])->name('pasien.periksa.index');
        Route::get('/{id}/detail', [PeriksaController::class, 'detail'])->name('pasien.periksa.detail');
        Route::get('/{id}/riwayat', [PeriksaController::class, 'riwayat'])->name('pasien.periksa.riwayat');
    });
});
