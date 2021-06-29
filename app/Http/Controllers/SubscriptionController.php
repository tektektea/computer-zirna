<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\utils\Util;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        try {

            return $this->handleResponse(Subscription::query()->paginate());
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function createOrder(Request $request): JsonResponse
    {
        try {
            $this->validate($request->all(), [
                'full_name' => 'required',
                'father_name' => 'required',
                'address' => 'required',
                'course_id' => 'required',
            ]);

            $username=env('RAZOR_KEY_ID');
            $password=env('RAZOR_SECRET_KEY');
            $response=Http::withBasicAuth($username,$password)
                ->post(env('RAZORPAY_BASE_URL').'orders',[
                    'amount'=>Util::COURSE_AMOUNT,
                    'currency'=>'INR',
                    'receipt' =>"". now()->getTimestamp(),
                ]);
            $result = json_decode($response->body(), true);

            dd($result);
            DB::beginTransaction();
            $currentUser = $request->user();
            $currentUser->name = $request->get('full_name');
            $currentUser->save();

            $sub=Subscription::create([
                'user_id' => $request->user()->id,
                'father_name' => $request->get('father_name'),
                'address' => $request->get('address'),
                'course_id' => $request->get('course_id'),
                'order_id'=>$result['id'],
                'receipt'=>$result['receipt'],
                'status' => 'draft',
            ]);

            DB::commit();
            return $this->handleResponse($sub, 'Order detailed created successfully');
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->handlingException($exception);
        }
    }
}
