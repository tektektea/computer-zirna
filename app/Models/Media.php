<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = ['file_name', 'type', 'url'];

    public function getUrlAttribute()
    {
        return url('storage/'.$this->attributes['url']);
    }
}
