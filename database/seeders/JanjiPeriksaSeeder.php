<?php

namespace Database\Seeders;

use App\Models\JadwalPeriksa;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JanjiPeriksaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pasien = User::where("role", "pasien")->first();
        $janjiPeriksa = [
            [
                'id_pasien' => $pasien->id,
                'id_jadwal_periksa' => JadwalPeriksa::where('hari', 'Senin')->first()->id,
                'keluhan' => 'mulai demam sejak 2 hari yang lalu',
                'no_antrian' => '1',
            ],
            [
                'id_pasien' => $pasien->id,
                'id_jadwal_periksa' => JadwalPeriksa::where('hari', 'Selasa')->first()->id,
                'keluhan' => 'mual dan muntah sejak 1 hari yang lalu',
                'no_antrian' => '1',
            ],
        ];

        foreach ($janjiPeriksa as $janji) {
            \App\Models\JanjiPeriksa::create($janji);
        };
    }
}
