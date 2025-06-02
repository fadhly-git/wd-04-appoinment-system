<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->delete(); // Clear existing users
        $users = [
            [
                'name' => 'Dr. John Doe',
                'email' => 'jhon@mail.com',
                'role' => 'dokter',
                'password' => Hash::make('password123'),
                'alamat' => 'Jl. Dokter No. 1',
                'no_hp' => '081234567890',
                'no_ktp' => '1212121212121212',
                'poli' => 'Poli Umum',
            ],
            [
                'name' => 'pasien Jhon Doe',
                'email' => 'pasien.jhon@mail.com',
                'role' => 'pasien',
                'password' => Hash::make('password234'),
                'alamat' => 'Jl. Dokter No. 1',
                'no_hp' => '081234567890',
                'no_ktp' => '021241212121212',
                'no_rm' => '20250501',
            ]
        ];
        foreach ($users as $user) {
            \App\Models\User::create($user);
        };
    }
}
