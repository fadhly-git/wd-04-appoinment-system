<?php

namespace App\Http\Controllers\Dokter;

use Illuminate\Http\Request;
use App\Models\JadwalPeriksa;
use App\Models\JanjiPeriksa;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\DetailPeriksa;
use App\Models\Obats;
use App\Models\Periksa;

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
        $obats = Obats::select('id', 'nama_obat', 'harga_obat')->get();

        $data = [
            'id' => $janji_periksa->id,
            'id_jadwal_periksa' => $janji_periksa->id_jadwal_periksa,
            'keluhan' => $janji_periksa->keluhan,
            'name' => $janji_periksa->pasien->name ?? null,
            'obats' => $obats,
        ];

        return Inertia::render('dokter/periksaPasien/periksa', [
            'datas' => $data,
        ]);
    }

    public function store($id, Request $request)
    {
        // return response()->json(['data' => $request->all(), 'id_janji' => $id]);
        $validated = $request->validate([
            'tanggal_periksa' => 'required|date',
            'catatan' => 'nullable|string',
            'biaya_periksa' => 'required|numeric',
            'obat' => 'nullable|array',
            'obat.*' => 'required|exists:obats,id',
        ]);

        $janji_periksa = JanjiPeriksa::findOrFail($id);
        $janji_periksa->periksa()->create([
            'id_janji_periksa' => $janji_periksa->id,
            'tgl_periksa' => $validated['tanggal_periksa'],
            'catatan' => $validated['catatan'],
            'biaya_periksa' => $validated['biaya_periksa'],
        ]);

        foreach ($validated['obat'] as $obatId) {
            $janji_periksa->periksa->detailPeriksa()->create([
                'id_periksa' => $janji_periksa->periksa->id,
                'id_obat' => $obatId,
            ]);
        }

        return redirect()->route('dokter.memeriksa.index')->with('success', 'berhasil memeriksa pasien');
    }

    public function edit($id)
    {
        $janji_periksa = JanjiPeriksa::with(['pasien'])->findOrFail($id);
        $periksa = Periksa::findOrFail($id);
        $obats = Obats::select('id', 'nama_obat', 'harga_obat')->get();
        $details = DetailPeriksa::where('id_periksa', $janji_periksa->periksa->id)
            ->pluck('id_obat')
            ->map(function ($id) {
                return ['id_obat' => $id];
            })
            ->values(); // Agar indeksnya urut dari 0
        $data = [
            'id' => $janji_periksa->id,
            'id_jadwal_periksa' => $janji_periksa->id_jadwal_periksa,
            'keluhan' => $janji_periksa->keluhan,
            'name' => $janji_periksa->pasien->name ?? null,
            'tanggal_periksa' => $periksa->tgl_periksa,
            'biaya_periksa' => $periksa->biaya_periksa,
            'catatan' => $periksa->catatan,
            'obats' => $obats,
            'detail_periksa' => $details,
        ];
        return Inertia::render('dokter/periksaPasien/edit', [
            'datas' => $data,
        ]);
    }

    public function update($id, Request $request)
    {
        $validated = $request->validate([
            'tanggal_periksa' => 'required|date',
            'catatan' => 'nullable|string',
            'biaya_periksa' => 'required|numeric',
            'obat' => 'nullable|array',
            'obat.*' => 'required|exists:obats,id',
        ]);

        // return response()->json(['data' => $validated, 'id_janji' => $id]);

        $janji_periksa = JanjiPeriksa::findOrFail($id);
        $periksa = Periksa::where('id_janji_periksa', $janji_periksa->id)->firstOrFail();

        $periksa->update([
            'tgl_periksa' => $validated['tanggal_periksa'],
            'catatan' => $validated['catatan'],
            'biaya_periksa' => $validated['biaya_periksa'],
        ]);

        // Hapus detail periksa yang ada
        $periksa->detailPeriksa()->where('id_periksa', $id)->delete();

        // Tambahkan detail periksa baru
        foreach ($validated['obat'] as $obatId) {
            $periksa->detailPeriksa()->create([
                'id_obat' => $obatId,
            ]);
        }

        return redirect()->route('dokter.memeriksa.index')->with('success', 'berhasil memperbarui pemeriksaan pasien');
    }
}
