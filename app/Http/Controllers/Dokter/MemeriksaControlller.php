<?php

namespace App\Http\Controllers\Dokter;

use Illuminate\Http\Request;
use App\Models\JadwalPeriksa;
use App\Models\JanjiPeriksa;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\Controller;

class MemeriksaControlller extends Controller
{
    public function index()
    {
        $jadwal_periksa = JadwalPeriksa::where("id_dokter", Auth::user()->id)
            ->where("status", true)->first();

        $janji_periksa = JanjiPeriksa::where("id_jadwal_periksa", $jadwal_periksa->id)
            ->with(
                'pasien',
                'periksa',
            )
            ->get();

        // dd($janji_periksa->first()->periksa);

        // return response()->json($janji_periksa);
        return Inertia::render('dokter/periksaPasien/index', ['data' => $janji_periksa]);
    }

    public function periksa($id)
    {
        $janji_periksa = JanjiPeriksa::with(['pasien'])->findOrFail($id);

        $data = [
            'id' => $janji_periksa->id,
            'id_jadwal_periksa' => $janji_periksa->id_jadwal_periksa,
            'keluhan' => $janji_periksa->keluhan,
            'name' => $janji_periksa->pasien->name ?? null,
        ];

        return Inertia::render('dokter/periksaPasien/periksa', [
            'data' => $data,
        ]);
    }
}
