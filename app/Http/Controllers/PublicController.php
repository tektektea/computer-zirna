<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Course;
use App\Models\Media;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    const testimony = [
        ['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Luctus accumsan tortor posuere',
            'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        ],
        ['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Luctus accumsan tortor posuere',
            'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        ],
        ['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        ac ut consequat semper viverra. Ac turpis egestas maecenas pharetra convallis.',
            'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        ],
        ['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        ac ut consequat semper viverra. Ac turpis egestas maecenas pharetra convallis.',
            'avatar' => 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        ],
    ];

    public function getPublicData(Request $request): JsonResponse
    {
        try {
            $courses = Course::with(['subjects' => function ($builder) {
                $builder->select(['title', 'description']);
            }])->get();
            $setting = Setting::query()->first();
            return $this->handleResponse([
                'testimony' => self::testimony,
                'courses' => $courses,
                'corousel' => json_decode($setting->setting, true)['corousel'],
                'images' => Media::query()->pluck('url'),
                'banners' => Banner::query()->get(['url']),
                'toc' => "1. One \n2.Two \n3.Three"
            ], '');
        } catch (\Exception $exception) {
            dd($exception);

        }

    }
}
