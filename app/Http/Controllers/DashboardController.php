<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Subject;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        try {
            $count_video=Video::query()->count();
            $count_user = User::query()->where('type', '<>', 'admin')->count();
            $count_course = Course::query()->count();
            $count_subject = Subject::query()->count();

            return $this->handleResponse([
                'count_video' => $count_video,
                'count_user' => $count_user,
                'count_course' => $count_course,
                'count_subject' => $count_subject,
            ], '');
        } catch (\Exception $exception) {

            return $this->handlingException($exception);
        }
    }
}
