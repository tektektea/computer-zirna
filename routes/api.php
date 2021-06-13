<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::get('otp/send', [OtpController::class, 'send']);
    Route::post('otp/verify', [OtpController::class, 'verify']);
    Route::get('otp/resend', [OtpController::class, 'resend']);

    Route::post('admin/login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::group(['prefix' => 'courses', 'middleware' => 'auth:sanctum'], function () {
    Route::get('index', [CourseController::class, 'all']);
    Route::post('create', [CourseController::class, 'create']);
    Route::delete('{course}', [CourseController::class, 'delete']);
    Route::put('{course}', [CourseController::class, 'update']);
});
Route::group(['prefix' => 'videos','middleware' => 'auth:sanctum'], function () {
    Route::get('index', [VideoController::class, 'all']);
    Route::post('create', [VideoController::class, 'create']);
    Route::delete('{video}/delete', [VideoController::class, 'delete']);
    Route::put('{video}/update', [VideoController::class, 'update']);
});
Route::group(['prefix' => 'admin','middleware' => 'auth:sanctum'], function () {
    Route::get('index', [UserController::class, 'all']);
    Route::post('create', [UserController::class, 'create']);
    Route::delete('{user}/delete', [UserController::class, 'delete']);
    Route::put('{user}/update', [UserController::class, 'update']);
});
Route::group(['prefix' => 'media', 'middleware' => 'auth:sanctum'], function () {
    Route::get('index', [MediaController::class, 'all']);
    Route::post('upload', [MediaController::class, 'upload']);
    Route::delete('{media}', [MediaController::class, 'delete']);
});


Route::get('public/data',[PublicController::class,'getPublicData']);
