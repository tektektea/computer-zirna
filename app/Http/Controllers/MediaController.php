<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function all(Request $request)
    {
        try {
            return $this->handleResponse(Media::query()->paginate(10), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function delete(Request $request,Media $media)
    {
        try {
            Storage::delete($media->url);
            $media->delete();
            return  $this->handleResponse(Media::query()->paginate(10), 'Image deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function upload(Request $request)
    {
        try {
//            $this->validate($request->only('images'), [
//                'images' => 'image|size:2048'
//            ]);
            if ($request->hasfile('images')) {
                $images = $request->file('images');

                foreach($images as $image) {
                    $name = $image->getClientOriginalName();
                    $path = $image->storeAs('media', $name, 'public');

                    Media::create([
                        'file_name' => $name,
                        'type'=>$image->getType(),
                        'url'=>$path
                    ]);
                }
            }
            return $this->handleResponse(Media::query()->paginate(10), 'Image upload successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
