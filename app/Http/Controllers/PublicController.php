<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getPublicData(Request $request): JsonResponse
    {
        $courses=Course::all();
        return $this->handleResponse([
            'courses' => $courses,
        ], '');
    }
}
