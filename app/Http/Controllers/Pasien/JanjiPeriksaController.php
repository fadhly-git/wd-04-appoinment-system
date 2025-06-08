<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// import models if needed
use App\Models\JanjiPeriksa;
use App\Models\User;
use App\Models\JadwalPeriksa;

class JanjiPeriksaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dokters = User::with([
            'jadwalPeriksa' => function ($query) {
                $query->where('status', true);
            },
        ])
            ->where('role', 'dokter')
            ->get();
        $jadwal_periksa = JadwalPeriksa::where('status', true)->get();
        return Inertia::render('pasien/janji-periksa/index', [
            'dokters' => $dokters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_jadwal_periksa' => 'required|exists:jadwal_periksas,id',
            'keluhan' => 'required',
        ]);

        $jumlahJanji = JanjiPeriksa::where('id_jadwal_periksa', $validatedData['id_jadwal_periksa'])->count();
        $noAntrian = $jumlahJanji + 1;

        JanjiPeriksa::create([
            'id_pasien' => Auth::user()->id,
            'id_jadwal_periksa' => $request->id_jadwal_periksa,
            'keluhan' => $request->keluhan,
            'no_antrian' => $noAntrian,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
