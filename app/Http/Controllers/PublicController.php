<?php

namespace App\Http\Controllers;

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
            'avatar'=>'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&tbnid=B3G4vEo9lSBh0M&vet=12ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ..i&docid=FvQHUVZ-cx81xM&w=500&h=750&q=free%20profile%20image&client=ubuntu&ved=2ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ'
        ],
        ['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Luctus accumsan tortor posuere',
            'avatar'=>'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&tbnid=B3G4vEo9lSBh0M&vet=12ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ..i&docid=FvQHUVZ-cx81xM&w=500&h=750&q=free%20profile%20image&client=ubuntu&ved=2ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ'
        ],
        ['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        ac ut consequat semper viverra. Ac turpis egestas maecenas pharetra convallis.',
            'avatar'=>'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&tbnid=B3G4vEo9lSBh0M&vet=12ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ..i&docid=FvQHUVZ-cx81xM&w=500&h=750&q=free%20profile%20image&client=ubuntu&ved=2ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ'
        ],['qoute' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        ac ut consequat semper viverra. Ac turpis egestas maecenas pharetra convallis.',
            'avatar'=>'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&tbnid=B3G4vEo9lSBh0M&vet=12ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ..i&docid=FvQHUVZ-cx81xM&w=500&h=750&q=free%20profile%20image&client=ubuntu&ved=2ahUKEwjw5tau9c7xAhVOcH0KHfojBakQMygAegUIARCwAQ'
        ],
    ];
    public function getPublicData(Request $request): JsonResponse
    {
        try {
            $courses=Course::with(['videos'=>function ( $builder){
                $builder->select(['title', 'description']);
            }])->get();
            $setting = Setting::query()->first();
            return $this->handleResponse([
                'testimony' => self::testimony,
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
