<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// |------------------------------------------------
// | import controller
// |------------------------------------------------
use App\Http\Controllers\Dokter\ObatController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        if ($user) {
            if ($user->role == 'dokter') {
                return redirect()->route('dokter.dashboard');
            } elseif ($user->role == 'pasien') {
                return redirect()->route('pasien.dashboard');
            }
        }
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/dokter.php';
require __DIR__ . '/pasien.php';
