<?php

namespace App\Http\Controllers\Dokter;

use App\Models\JadwalPeriksa;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalDokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jadwal = JadwalPeriksa::all();
        return Inertia::render('dokter/JadwalDokter/Index', [
            'jadwal' => $jadwal,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dokter/JadwalDokter/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'hari' => 'required|string|in:senin,selasa,rabu,kamis,jumat,sabtu,minggu',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'status' => 'boolean',
        ]);

        JadwalPeriksa::create([
            'id_dokter' => $user->id,
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'status' => $request->status ?? false,
        ]);

        return back()->with('success', 'Jadwal berhasil ditambahkan.');
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
        $jadwal = JadwalPeriksa::findOrFail($id);
        return Inertia::render('dokter/JadwalDokter/edit', [
            'jadwal' => $jadwal,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        $jadwal = JadwalPeriksa::findOrFail($id);

        $request->validate([
            'hari' => 'required|string|in:senin,selasa,rabu,kamis,jumat,sabtu,minggu',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'status' => 'boolean',
        ]);

        $jadwal->update([
            'id_dokter' => $user->id,
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'status' => $request->status ?? false,
        ]);

        return back()->with('success', 'Jadwal berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jadwal = JadwalPeriksa::findOrFail($id);
        if ($jadwal->id_dokter !== Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak memiliki izin untuk menghapus jadwal ini.']);
        } else if ($jadwal) {
            $jadwal->delete();
            return back()->with('success', 'Jadwal berhasil dihapus.');
        } else {
            return back()->withErrors(['error' => 'Jadwal tidak ditemukan.']);
        }
    }
}
