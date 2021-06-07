<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function all(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('view:course');
            if (!$permit) {
                throw  new \Exception('Permission denied', 403);
            }
            return $this->handleResponse(Course::all(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function create(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('create:course');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $this->validate($request->only(['title', 'description', 'price']), [
                'title' => 'required',
                'price' => 'required|numeric'
            ]);
            $course=Course::create($request->only(['title','description','price']));
            return $this->handleResponse($course, 'Course created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function update(Request $request,Course $course)
    {
        try {
            $permit=$request->user()->tokenCan('update:course');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $this->validate($request->only(['title', 'description', 'price']), [
                'title' => 'required',
                'price' => 'required'
            ]);
            $course->title = $request->get('title');
            $course->description = $request->get('description');
            $course->price = $request->get('price');
            $course->save();

            return $this->handleResponse($course, 'Course updated successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function delete(Request $request,Course $course)
    {
        try {
            $permit=$request->user()->tokenCan('delete:course');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $course->delete();

            return $this->handleResponse($course, 'Course deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
