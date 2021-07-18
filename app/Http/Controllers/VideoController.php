<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Video;
use Illuminate\Database\Eloquent\Builder;
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
            $search = $request->get('search');
            $data = Video::query()
                ->when($request->has('search'), function (Builder $builder) use ($search) {
                    $builder->where('title', "LIKE", "%$search%");
                })->paginate();
            return $this->handleResponse($data, '');
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
            $this->validate($request->only(['title', 'description', 'video_url']), [
                'title' => 'required',
                'description' => 'required',
                'video_url'=>'required'
            ]);
            $video->title = $request->get('title');
            $video->description = $request->get('description');
            $video->video_url = $request->get('video_url');
            $video->save();

            return $this->handleResponse(Video::query()->paginate(12), 'Video updated successfully');
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

            return $this->handleResponse(Video::query()->paginate(12), 'Course delete successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
