<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function homeimages(Request $request)
    {
        $items = [
            ['title' => 'Image1 title image',
                'description' => 'description',
                'image_path' => Storage::disk('public')->get('/images/tech1.jpg')],
            ['title' => 'Image2 title image',
                'description' => 'description',
                'image_path' => Storage::disk('public')->get('/images/tech2.jpg')],
            ['title' => 'Image3 title image',
                'description' => 'description',
                'image_path' => Storage::disk('public')->get('/images/tech3.jpg')]
        ];
        return $this->handleResponse($items, '');
    }

    public function ads(Request $request)
    {

    }
}
