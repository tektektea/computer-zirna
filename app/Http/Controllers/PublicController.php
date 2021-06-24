<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Media;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getPublicData(Request $request): JsonResponse
    {
        $courses=Course::all();
        $setting = Setting::query()->first();
        return $this->handleResponse([
            'courses' => $courses,
            'corousel' => json_decode($setting->setting, true)['corousel'],
            'images'=>Media::query()->pluck('url'),
            'toc'=>"1. One \n2.Two \n3.Three"
        ], '');
    }
}
