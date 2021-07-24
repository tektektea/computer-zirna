<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use SoftDeletes,HasFactory;

    protected $fillable = ['title', 'description'];

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class);
    }
    public function videos(): BelongsToMany
    {
        return $this->belongsToMany(Video::class,);
    }
}
