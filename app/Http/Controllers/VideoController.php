<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('view:video');
            if (!$permit) {
                throw  new \Exception('Permission denied', 403);
            }
            return $this->handleResponse(Video::query()->paginate(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function all(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('view:video');
            if (!$permit) {
                throw  new \Exception('Permission denied', 403);
            }
            return $this->handleResponse(Video::all(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function create(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('create:video');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $this->validate($request->only(['title', 'description', 'video_url']), [
                'title' => 'required',
                'video_url' => 'required',
            ]);
            $video=Video::create($request->only(['title','description','video_url']));
            return $this->handleResponse(Video::query()->paginate(12), 'New Video created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function update(Request $request,Video $video)
    {
        try {
            $permit=$request->user()->tokenCan('update:video');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $this->validate($request->only(['title', 'description', 'price']), [
                'title' => 'required',
                'url' => 'required',
                'course_id'=>'required'
            ]);
            $video->course_id = $request->get('course_id');
            $video->title = $request->get('title');
            $video->description = $request->get('description');
            $video->url = $request->get('url');
            $video->save();

            return $this->handleResponse($video, 'Video updated successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function delete(Request $request,Video $video)
    {
        try {
            $permit=$request->user()->tokenCan('delete:video');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $video->delete();

            return $this->handleResponse(Video::query()->paginate(), 'Course delete successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
