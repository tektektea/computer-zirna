<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable=['user_id','course_id','father_name','address','order_id','receipt','status','expired_at'];

    protected $appends = ['course_name'];

    public function getCourseNameAttribute()
    {
        return $this->course() ? $this->course()->pluck('name') : '';
    }
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function scopeSubscriber(Builder $builder)
    {
        return $builder->whereNotNull('user_id')
            ->where('status', 'subscribe');
    }
}
