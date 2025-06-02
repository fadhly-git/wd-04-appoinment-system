<?php

namespace App\Http\Controllers\Dokter;

use App\Models\Obats;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ObatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $obat = Obats::all();
        return Inertia::render('dokter/obat/index', [
            'obats' => $obat,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dokter/obat/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_obat' => 'required|string|max:255',
            'kemasan' => 'required|string|max:255',
            'harga_obat'    => 'required|numeric|min:0',
        ]);
        // Log::info('Storing new obat', [
        //     'nama_obat' => $request->nama_obat,
        //     'kemasan'   => $request->kemasan,
        //     'harga_obat' => $request->harga_obat,
        // ]);

        Obats::create([
            'nama_obat' => $request->nama_obat,
            'kemasan'   => $request->kemasan,
            'harga_obat'     => $request->harga_obat,
        ]);

        return back()->with('success', 'Obat berhasil ditambahkan.');
        // return response()->json([
        //     'message' => 'Obat berhasil ditambahkan.',
        //     'reqeuest' => $request->all(),
        //     'harga_obat' => $request->harga_obat,
        // ], 201);
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
        $obat = Obats::find($id);
        return Inertia::render('dokter/obat/edit', [
            'obat' => $obat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nama_obat' => 'required|string|max:255',
            'kemasan'   => 'required|string|max:255',
            'harga_obat'     => 'required|numeric|min:0',
        ]);

        $obat = Obats::find($id);
        $obat->update([
            'nama_obat' => $request->nama_obat,
            'kemasan'   => $request->kemasan,
            'harga_obat'     => $request->harga_obat,
        ]);
        return redirect()->route('dokter.obat.index')->with('success', 'Obat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $obat = Obats::find($id);
        if ($obat) {
            $obat->delete();
            return redirect()->route('dokter.obat.index')->with('success', 'Obat berhasil dihapus.');
        }
        return redirect()->route('dokter.obat.index')->with('error', 'Obat tidak ditemukan.');
    }
}
