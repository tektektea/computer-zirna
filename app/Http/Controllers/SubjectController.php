<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Video;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(Request $request)
    {

        try {
            $search = $request->get('search');
            $data=Subject::query()
                ->when($search,function (Builder $builder) use ($search) {
                    $builder->where('title', 'LIKE', "%$search%");
                })
                ->paginate();
            return $this->handleResponse($data, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function all(Request $request)
    {
        try {
            return $this->handleResponse(Subject::all(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function videos(Request $request,Subject $subject)
    {

        try {
            $data = $subject->videos()->get();
            return $this->handleResponse($data, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function show(Request $request,Subject $subject)
    {

        try {
            return $this->handleResponse($subject->load(['videos']), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function create(Request $request)
    {
        try {
            $this->validate($request->only(['title', 'description']), [
                'title' => 'required',
            ]);
            $videos = $request->get('videos');

            $subject=Subject::create($request->only(['title', 'description']));
           $v= collect($videos)->map(function ($video) use ($subject) {
                return new Video($video);

            });
//            $subject = new Subject();
            $subject->videos()->saveMany($v);

            return$this->handleResponse($subject, 'Subject created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function update(Request $request,Subject $subject)
    {
        try {
            $this->validate($request->only(['title', 'description']), [
                'title' => 'required',
            ]);
            $videos = $request->get('videos');
            $subject->update($request->only(['title', 'description']));
            $subject->videos()->delete();
            $subject->save();
            $vd=collect($videos)->map(function ($video) use ($subject) {
//                $v = new Video($video);

                    return new Video($video);
            });
            $subject->videos()->saveMany($vd);
            return $this->handleResponse($subject, 'Subject updated successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function delete(Request $request,Subject $subject)
    {
        try {
            $subject->delete();
            return $this->handleResponse(Subject::query()->paginate(), 'Subject deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
