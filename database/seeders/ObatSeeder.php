<?php

namespace Database\Seeders;

use App\Models\Obats;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ObatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("obats")->delete();
        $obats = [
            [
                'nama_obat' => 'Paracetamol',
                'kemasan' => 'Tablet',
                'harga_obat' => 5000,

            ],
            [
                'nama_obat' => 'Amoxicillin',
                'kemasan' => 'Kapsul',
                'harga_obat' => 15000,

            ],
            [
                'nama_obat' => 'Ibuprofen',
                'kemasan' => 'Sirup',
                'harga_obat' => 8000,

            ],
        ];
        foreach ($obats as $obat) {
            Obats::create($obat);
        };
    }
}
