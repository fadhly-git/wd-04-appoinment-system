<?php

namespace Database\Seeders;

use App\Models\Obats;
use App\Models\Periksa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailPeriksaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $obat = new Obats();
        $periksa = new Periksa();
        $detailPeriksa = [
            [
                'id_periksa' => $periksa->where('id', 1)->first()->id,
                'id_obat' => $obat->where('id', 1)->first()->id,
            ],
            [
                'id_periksa' => $periksa->where('id', 1)->first()->id,
                'id_obat' => $obat->where('id', 2)->first()->id,
            ],
            [
                'id_periksa' => $periksa->where('id', 2)->first()->id,
                'id_obat' => $obat->where('id', 3)->first()->id,
            ],
        ];

        foreach ($detailPeriksa as $detail) {
            \App\Models\DetailPeriksa::create($detail);
        }
    }
}
