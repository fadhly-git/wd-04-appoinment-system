<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JadwalPeriksaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dokter = User::where('role', 'dokter')->first();
        $jadwalPeriksa = [
            [
                'id_dokter' => $dokter->id,
                'hari' => 'Senin',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
            ],
            [
                'id_dokter' => $dokter->id,
                'hari' => 'Selasa',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
            ],
            [
                'id_dokter' => $dokter->id,
                'hari' => 'Rabu',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
            ],
            [
                'id_dokter' => $dokter->id,
                'hari' => 'Kamis',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
            ],
            [
                'id_dokter' => $dokter->id,
                'hari' => 'Jumat',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
            ],
        ];

        foreach ($jadwalPeriksa as $jadwal) {
            \App\Models\JadwalPeriksa::create($jadwal);
        }
    }
}
