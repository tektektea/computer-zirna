<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function all(Request $request)
    {
        try {
            return $this->handleResponse(Banner::all());
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function create(Request $request)
    {
        try {
            $this->validate($request->only(['url', 'description']),[
                'url'=>'required'
            ]);
            $banner=Banner::create($request->only(['url', 'description']));
            return $this->handleResponse(Banner::all(), 'Banner created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function destroy(Request $request,Banner $banner)
    {
        try {
            $banner->delete();
            return $this->handleResponse(Banner::all(), 'banner deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
