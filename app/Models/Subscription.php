<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable=['user_id','father_name','address','order_id','receipt','status'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}