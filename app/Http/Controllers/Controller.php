<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected function validate(array $data,array $rule): bool
    {
        $validator = Validator::make($data, $rule);
        if ($validator->fails()) throw new \Exception(implode(PHP_EOL, $validator->getMessageBag()->all()),400);
        return true;
    }

    protected function handleResponse($data,$message=''): JsonResponse
    {
        return response()->json([
            'data'=>$data,
            'message'=>$message
        ]);
    }
    protected function handlingException(\Exception $exception):JsonResponse
    {
        Log::error('code '.$exception->getCode().' Reason:'.$exception->getMessage());
        return response()->json([
            'error' => $exception->getMessage()
        ], 400);
    }
}
