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

    public function purchaseCourse(Request $request)
    {
        try {
            $this->validate($request->only(['razorpay_order_id', 'subscription_id','razorpay_payment_id', 'razorpay_signature']), [
                'razorpay_payment_id' => 'required',
                'razorpay_order_id' => 'required',
                'razorpay_signature' => 'required',
                'subscription_id' => 'required',
            ]);
            $order_id = $request->get('razorpay_order_id');
            $payment_id = $request->get('razorpay_payment_id');
            $signature = $request->get('razorpay_signature');

            $message = $order_id . '|' . $payment_id;
            $generated_signature = hash_hmac('sha256', $message, env('RAZOR_SECRET_KEY'));

            if ($signature === $generated_signature) {
                return $this->handleResponse(null, 'Payment verified');
            }
            throw new \Exception('Unauthorized payment', 400);
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

            $username = env('RAZOR_KEY_ID');
            $password = env('RAZOR_SECRET_KEY');
            $response = Http::withBasicAuth($username, $password)
                ->post(env('RAZORPAY_BASE_URL') . 'orders', [
                    'amount' => Util::COURSE_AMOUNT,
                    'currency' => 'INR',
                    'receipt' => "" . now()->getTimestamp(),
                ]);
            $result = json_decode($response->body(), true);

            DB::beginTransaction();
            $currentUser = $request->user();
            $currentUser->name = $request->get('full_name');
            $currentUser->save();

            $sub = Subscription::create([
                'user_id' => $request->user()->id,
                'father_name' => $request->get('father_name'),
                'address' => $request->get('address'),
                'course_id' => $request->get('course_id'),
                'order_id' => $result['id'],
                'receipt' => $result['receipt'],
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
