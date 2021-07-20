<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Material extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'description', 'path', 'mime'];
    protected $appends = ['category'];

    public function getCategoryAttribute()
    {
        $cat = $this->categories()->first();

        return $cat ? $cat->name : '';
    }

    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categorizable','categorizables');
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class);
    }
}
