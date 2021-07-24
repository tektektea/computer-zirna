<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use SoftDeletes,HasFactory;

    protected $fillable = ['id','title', 'description', 'video_url','course_id'];

    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class);
    }
}

