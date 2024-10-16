<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lot',
        'validity_date'
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }
}