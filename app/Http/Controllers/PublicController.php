<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Media;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getPublicData(Request $request): JsonResponse
    {
        try {
            $courses=Course::with(['videos'=>function ( $builder){
                $builder->select(['title', 'description']);
            }])->get();
            $setting = Setting::query()->first();
            return $this->handleResponse([
                'courses' => $courses,
                'corousel' => json_decode($setting->setting, true)['corousel'],
                'images'=>Media::query()->pluck('url'),
                'toc'=>"1. One \n2.Two \n3.Three"
            ], '');
        } catch (\Exception $exception) {
            dd($exception);

        }

    }
}
