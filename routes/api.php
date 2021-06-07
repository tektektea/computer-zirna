<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix' => 'courses'], function () {
    Route::get('all', [CourseController::class, 'all']);
    Route::post('create', [CourseController::class, 'create']);
    Route::delete('{course}/delete', [CourseController::class, 'delete']);
    Route::put('{course}/update', [CourseController::class, 'update']);
});
Route::group(['prefix' => 'videos'], function () {
    Route::get('all', [VideoController::class, 'all']);
    Route::post('create', [VideoController::class, 'create']);
    Route::delete('{video}/delete', [VideoController::class, 'delete']);
    Route::put('{video}/update', [VideoController::class, 'update']);
});
Route::group(['prefix' => 'users'], function () {
    Route::get('all', [UserController::class, 'all']);
    Route::post('create', [UserController::class, 'create']);
    Route::delete('{video}/delete', [UserController::class, 'delete']);
    Route::put('{video}/update', [UserController::class, 'update']);
});
