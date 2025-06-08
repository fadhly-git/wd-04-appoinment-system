<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// |------------------------------------------------
// | import controller
// |------------------------------------------------
use App\Http\Controllers\Dokter\ObatController;
use App\Http\Controllers\Dokter\JadwalDokterController;
use App\Http\Controllers\Dokter\MemeriksaControlller as DokterMemeriksaControlller;

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

    Route::prefix('jadwal-periksa')->group(function () {
        Route::get('/', [JadwalDokterController::class, 'index'])->name('dokter.jadwal.index');
        Route::get('/create', [JadwalDokterController::class, 'create'])->name('dokter.jadwal.create');
        Route::post('/', [JadwalDokterController::class, 'store'])->name('dokter.jadwal.store');
        Route::get('/{id}/edit', [JadwalDokterController::class, 'edit'])->name('dokter.jadwal.edit');
        Route::patch('/{id}', [JadwalDokterController::class, 'update'])->name('dokter.jadwal.update');
        Route::patch('/{id}/status', [JadwalDokterController::class, 'updateStatus'])->name('dokter.jadwal.update.status');
        Route::delete('/{id}', [JadwalDokterController::class, 'destroy'])->name('dokter.jadwal.destroy');
    });

    Route::prefix('memeriksa')->group(function () {
        Route::get('/', [DokterMemeriksaControlller::class, 'index'])->name('dokter.memeriksa.index');
        Route::get('/{id}/periksa', [DokterMemeriksaControlller::class, 'periksa'])->name('dokter.memeriksa.periksa');
        Route::post('/{id}/periksa', [DokterMemeriksaControlller::class, 'store'])->name('dokter.memeriksa.store');
    });
});
