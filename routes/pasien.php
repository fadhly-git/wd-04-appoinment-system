<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'role:pasien'])->prefix('pasien')->group(function () {
    Route::get(
        '/dashboard',
        fn() =>
        Inertia::render('pasien/dashboard', [
            'user' => \Illuminate\Support\Facades\Auth::user(),
        ])
    )->name('pasien.dashboard');
});
