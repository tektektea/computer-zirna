<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function changeCorousel(Request $request)
    {
        try {
            $corousel=$request->get('corousel');
            $setting=Setting::query()->first();
            $result = json_decode($setting->setting,true);
            $result['corousel']=$corousel;
            $setting->setting = $result;
            $setting->save();

            return $this->handleResponse($corousel, 'Changed corousel successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function changeAds(Request $request)
    {
        try {
            $corousel=$request->get('corousel');
            $setting=Setting::query()->first();
            $result = json_decode($setting->data,true);
            $result['corousel']=$corousel;
            $setting->data = $result;
            return $this->handleResponse($corousel, 'Changed corousel successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
