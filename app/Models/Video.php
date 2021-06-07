<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use SoftDeletes,HasFactory;

    protected $fillable = ['title', 'description', 'url','course_id'];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}

