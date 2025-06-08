<?php

namespace App\Http\Controllers\Dokter;

use App\Models\JadwalPeriksa;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Resources\JadwalPeriksaResource;

class JadwalDokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jadwal = JadwalPeriksa::where('id_dokter', Auth::id())
            ->orderBy('hari')
            ->orderBy('jam_mulai')
            ->get();
        $dokter = User::where('role', 'dokter')->get()->pluck('name', 'id');
        $jadwal = $jadwal->map(function ($item) use ($dokter) {
            return [
                'id' => $item->id,
                'id_dokter' => $item->id_dokter,
                'hari' => $item->hari,
                'jam_mulai' => $item->jam_mulai,
                'jam_selesai' => $item->jam_selesai,
                'status' => $item->status,
                'dokter' => $dokter[$item->id_dokter] ?? 'Tidak Diketahui',
            ];
        });
        return Inertia::render('dokter/JadwalDokter/index', [
            'jadwals' => $jadwal,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dokter/JadwalDokter/create');
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

        // Cek apakah jadwal sudah ada atau berada dalam rentang jadwal yang ada
        $exists = JadwalPeriksa::where('id_dokter', $user->id)
            ->where('hari', $request->hari)
            ->where(function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('jam_mulai', '<', $request->jam_selesai)
                        ->where('jam_selesai', '>', $request->jam_mulai);
                });
            })
            ->exists();

        if ($request->status) {
            JadwalPeriksa::where('id_dokter', $user->id)
                ->where('status', true)
                ->update(['status' => false]);
        }

        if ($exists) {
            return back()->withErrors(['error' => 'Jadwal dengan hari dan jam yang sama sudah ada.']);
        }

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
        // Ubah format jam_mulai dan jam_selesai tanpa Carbon
        $jadwal->jam_mulai = date('H:i', strtotime($jadwal->jam_mulai));
        $jadwal->jam_selesai = date('H:i', strtotime($jadwal->jam_selesai));
        return Inertia::render('dokter/JadwalDokter/edit', [
            'jadwals' => $jadwal,
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
            'status' => 'numeric|nullable|in:0,1',
        ]);

        // Jika status yang diupdate menjadi aktif (1 atau true), set semua jadwal dokter ini menjadi tidak aktif (false)
        if ($request->status) {
            JadwalPeriksa::where('id_dokter', $user->id)
                ->where('id', '!=', $jadwal->id)
                ->update(['status' => false]);
        }

        // Cek apakah jadwal sudah ada atau berada dalam rentang jadwal yang ada
        // $exists = JadwalPeriksa::where('id_dokter', $user->id)
        //     ->where('hari', $request->hari)
        //     ->where(function ($query) use ($request) {
        //         $query->where(function ($q) use ($request) {
        //             $q->where('jam_mulai', '<', $request->jam_selesai)
        //                 ->where('jam_selesai', '>', $request->jam_mulai);
        //         });
        //     })
        //     ->exists();

        // if ($exists) {
        //     return back()->withErrors(['error' => 'Jadwal dengan hari dan jam yang sama sudah ada.']);
        // }

        $jadwal->update([
            'id_dokter' => $user->id,
            'hari' => $request->hari,
            'jam_mulai' => $request->jam_mulai,
            'jam_selesai' => $request->jam_selesai,
            'status' => $request->status ?? false,
        ]);

        return back()->with('success', 'Jadwal berhasil diperbarui.');
    }

    public function updateStatus(Request $request, string $id)
    {
        $jadwal = JadwalPeriksa::findOrFail($id);
        if ($jadwal->id_dokter !== Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak memiliki izin untuk mengubah status jadwal ini.']);
        }

        // Jika status yang diupdate menjadi aktif (true), set semua jadwal dokter ini menjadi tidak aktif (false)
        if (!$jadwal->status) {
            JadwalPeriksa::where('id_dokter', $jadwal->id_dokter)
                ->where('id', '!=', $jadwal->id)
                ->update(['status' => false]);
        }
        $jadwal->status = !$jadwal->status;
        $jadwal->save();

        return back()->with('success', 'Status jadwal berhasil diperbarui.');
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
