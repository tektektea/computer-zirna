<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubscriptionController;
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

Route::get('test/{course}', [SubscriptionController::class, 'videos']);
Route::post('contacts/create}', [ContactController::class, 'create']);

Route::get('dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth:sanctum']);

Route::group(['prefix' => 'auth'], function () {
    Route::get('otp/send', [OtpController::class, 'send']);
    Route::post('otp/verify', [OtpController::class, 'verify']);
    Route::get('otp/resend', [OtpController::class, 'resend']);

    Route::post('admin/login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
Route::group(['prefix' => 'user','middleware' => 'auth:sanctum'], function () {
    Route::get('index', [UserController::class, 'appUser']);
    Route::post('create', [UserController::class, 'createUser']);
    Route::delete('{user}', [UserController::class, 'deleteUser']);
    Route::put('{user}', [UserController::class, 'updateUser']);
});

Route::group(['prefix' => 'admin','middleware' => 'auth:sanctum'], function () {
    Route::get('index', [UserController::class, 'all']);
    Route::post('create', [UserController::class, 'create']);
    Route::delete('{user}', [UserController::class, 'delete']);
    Route::put('{user}/update', [UserController::class, 'update']);
});

Route::group(['prefix' => 'courses', 'middleware' => 'auth:sanctum'], function () {
    Route::get('index', [CourseController::class, 'all']);
    Route::get('{course}/show', [CourseController::class, 'show']);
    Route::post('create', [CourseController::class, 'create']);
    Route::delete('{course}', [CourseController::class, 'delete']);
    Route::put('{course}', [CourseController::class, 'update']);
    Route::get('{course}/subjects', [CourseController::class, 'subjects']);
    Route::get('{course}/materials', [CourseController::class, 'materials']);
});
Route::group(['prefix' => 'subjects', 'middleware' => 'auth:sanctum'], function () {
    Route::get('all', [SubjectController::class, 'all']);
    Route::get('index', [SubjectController::class, 'index']);
    Route::get('{subject}/show', [SubjectController::class, 'show']);
    Route::post('create', [SubjectController::class, 'create']);
    Route::delete('{subject}', [SubjectController::class, 'delete']);
    Route::put('{subject}', [SubjectController::class, 'update']);
    Route::get('{subject}/videos', [SubjectController::class, 'videos']);
});

Route::group(['prefix' => 'videos','middleware' => 'auth:sanctum'], function () {
    Route::get('all', [VideoController::class, 'all']);
    Route::get('index', [VideoController::class, 'index']);
    Route::post('create', [VideoController::class, 'create']);
    Route::delete('{video}', [VideoController::class, 'delete']);
    Route::put('{video}', [VideoController::class, 'update']);
});
Route::group(['prefix' => 'material','middleware' => 'auth:sanctum'], function () {
    Route::get('all', [MaterialController::class, 'all']);
    Route::get('index', [MaterialController::class, 'index']);
    Route::post('create', [MaterialController::class, 'create']);
    Route::delete('{material}', [MaterialController::class, 'delete']);
    Route::get('{material}', [MaterialController::class, 'download']);
});


Route::group(['prefix' => 'media', 'middleware' => 'auth:sanctum'], function () {
    Route::get('index', [MediaController::class, 'all']);
    Route::post('upload', [MediaController::class, 'upload']);
    Route::delete('{media}', [MediaController::class, 'delete']);
});

Route::group(['prefix' => 'banner', 'middleware' => 'auth:sanctum'], function () {
    Route::get('all', [BannerController::class, 'all']);
    Route::post('create', [BannerController::class, 'create']);
    Route::delete('{banner}', [BannerController::class, 'destroy']);
});



Route::group(['prefix' => 'subscription', 'middleware' => 'auth:sanctum'], function () {
    Route::get('index', [SubscriptionController::class, 'index']);
    Route::post('create', [SubscriptionController::class, 'createOrder']);
    Route::post('verify', [SubscriptionController::class, 'verify']);
    Route::post('{subscription}/renew', [SubscriptionController::class, 'renew']);
    Route::post('{subscription}/block', [SubscriptionController::class, 'block']);
    Route::post('{subscription}/unblock', [SubscriptionController::class, 'unblock']);
    Route::get('subscribers', [SubscriptionController::class, 'subscribers']);
    Route::get('{user}/detail', [SubscriptionController::class, 'getSubscriptions']);
    Route::delete('{subscription}', [SubscriptionController::class, 'deleteSubscription']);
    Route::post('subscriber/create', [SubscriptionController::class, 'createSubscriber']);
});

Route::group(['prefix' => 'setting', 'middleware' => 'auth:sanctum'], function () {
    Route::post('corousel/change', [SettingController::class, 'changeCorousel']);
});


Route::get('public/data',[PublicController::class,'getPublicData']);
Route::group(['prefix' => 'profile','middleware' => 'auth:sanctum'], function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::put('update', [AuthController::class, 'updateProfile']);
    Route::get('courses', [SubscriptionController::class, 'userCourse']);
    Route::get('courses/{course}/videos', [SubscriptionController::class, 'videos']);
    Route::get('courses/{course}/materials', [SubscriptionController::class, 'materials']);
});
Route::group(['prefix' => 'contacts', 'middleware' => 'auth:sanctum'], function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::delete('{contact}', [ContactController::class, 'delete']);
});

