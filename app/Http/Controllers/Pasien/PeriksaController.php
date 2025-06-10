<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\JadwalPeriksa;
use App\Models\JanjiPeriksa;
use App\Models\Periksa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PeriksaController extends Controller
{
    // app/Http/Controllers/Pasien/PeriksaController.php

    public function index()
    {
        $janjiperiksa = JanjiPeriksa::where('id_pasien', Auth::id())
            ->with(['jadwal.dokter'])
            ->get();

        return Inertia::render('pasien/periksa/index', [
            'janjiperiksa' => $janjiperiksa,
        ]);
    }

    public function detail($id)
    {
        $janjiPeriksa = JanjiPeriksa::with(['jadwal.dokter'])
            ->findOrFail($id);

        return Inertia::render('pasien/periksa/detail', [
            'janjiPeriksa' => $janjiPeriksa,
        ]);
    }

    public function riwayat($id)
    {
        $periksa = Periksa::where('id_janji_periksa', $id)
            ->with(['detailPeriksa', 'detailPeriksa.obat'])
            ->first();

        $data = [
            'tgl_periksa' => $periksa->tgl_periksa->format('d-m-Y H:i'),
            'catatan' => $periksa->catatan,
            'biaya_periksa' => $periksa->biaya_periksa,
            'obat' => $periksa->detailPeriksa->map(function ($detail) {
                return [
                    'nama_obat' => $detail->obat->nama_obat,
                    'kemasan' => $detail->obat->kemasan,
                ];
            }),
        ];

        // return response()->json($data);
        return Inertia::render('pasien/periksa/riwayat', [
            'riwayat_periksa' => $data
        ]);
    }
}
