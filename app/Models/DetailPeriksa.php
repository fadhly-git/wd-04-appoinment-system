<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPeriksa extends Model
{
    protected $table = "detail_periksas";
    protected $fillable = [
        'id_periksa',
        'id_obat',
    ];

    public function periksa()
    {
        return $this->belongsTo(Periksa::class, 'id_periksa');
    }
    public function obat()
    {
        return $this->belongsTo(Obats::class, 'id_obat');
    }
}
