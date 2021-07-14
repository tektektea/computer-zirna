<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Video;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function all(Request $request)
    {

        try {
            $data=Subject::query()->paginate();
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
            $subject->videos()->sync($videos);

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
            $videos = $request->get('video_id');
            $subject->update($request->only(['title', 'description']));
            $subject->videos()->sync($videos);

            return $this->handleResponse($subject, 'Subject updated successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function delete(Request $request,Subject $subject)
    {
        try {
            $subject->delete();
            return $this->handleResponse($subject, 'Subject deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
