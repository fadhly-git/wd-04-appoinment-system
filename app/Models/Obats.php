<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obats extends Model
{
    protected $table = "obats";

    protected $fillable = [
        'nama_obat',
        'kemasan',
        'harga_obat',
    ];

    public function detailPeriksa()
    {
        return $this->hasMany(DetailPeriksa::class, 'id_obat');
    }
}
