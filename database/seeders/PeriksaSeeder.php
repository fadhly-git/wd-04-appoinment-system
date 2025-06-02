<?php

namespace Database\Seeders;

use App\Models\JanjiPeriksa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class PeriksaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $janji = new JanjiPeriksa();
        $periksa = [
            [
                'id_janji_periksa' => $janji->where('id_jadwal_periksa', 1)->first()->id,
                'tgl_periksa' => Date::now(),
                'catatan' => 'Pasien mengalami demam tinggi dan nyeri sendi.',
                'biaya_periksa' => 10000,
            ],
            [
                'id_janji_periksa' => $janji->where('id_jadwal_periksa', 2)->first()->id,
                'tgl_periksa' => Date::now(),
                'catatan' => 'Pasien mengeluhkan mual dan muntah, perlu pemeriksaan lebih lanjut.',
                'biaya_periksa' => 15000,
            ],
        ];

        foreach ($periksa as $item) {
            \App\Models\Periksa::create($item);
        }
    }
}
