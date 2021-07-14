<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description'];

    public function courses(){
        return $this->belongsToMany(Course::class);
    }
    public function videos(){
        return $this->belongsToMany(Video::class);
    }
}
