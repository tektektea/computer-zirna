<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Subscription;
use App\Models\User;
use App\utils\SubscriptionEnum;
use App\utils\Util;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function userCourse(Request $request)
    {
        try {
            return$this->handleResponse($request->user(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function verify(Request $request)
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
                $subscription=Subscription::query()->find($request->get('subscription_id'));
                $subscription->status = 'subscribe';
                //$subscription->purchase_at = Carbon::now();
                $subscription->save();

                return $this->handleResponse($subscription, 'Payment verified');
            }
            throw new \Exception('Unauthorized payment', 400);
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }

    }

    public function subscribers(Request $request)
    {
        try {
            $search = $request->get('search');
            $data=User::subscribers()
                ->when($search, function (Builder $builder) use ($search) {
                    $builder->where('name', 'LIKE', "%$search%");
                })
                ->paginate();
            return $this->handleResponse($data, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function deleteSubscription(Request $request,Subscription $subscription)
    {
        try {
            $subscription->delete();
            $user=$request->user();

            return $this->handleResponse($user,
                'Subscription deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function createSubscriber(Request $request): JsonResponse
    {
        try {
            $this->validate($request->only([
                'courses','name','phone_no','father_name','address'
            ]), [
                'courses' => 'required',
                'name'=>'required',
                'phone_no'=>'required',
                'father_name'=>'required',
                'address'=>'required',
            ]);
            $courses = array_values($request->get('courses'));

            DB::transaction(function () use ($courses, $request) {
                $user=User::query()->create($request->only(['name', 'phone_no', 'father_name', 'address']));
                $subscriptions = collect($courses)->map(function ($course_id) use ($user, $request) {
                    return Subscription::create([
                        'father_name' => $request->get('father_name'),
                        'address' => $request->get('address'),
                        'course_id' => $course_id,
                        'expired_at'=>$request->get('expired_at'),
                        'user_id' => $request->user()->id,
                        'order_id'=>"MANUALLY ADDED",
                        'receipt'=>"MANUALLY ADDED",
                        'status' => SubscriptionEnum::SUBSCRIBE,
                    ]);
                });
                $user->subscriptions()->saveMany($subscriptions);
            });

            return $this->handleResponse(User::subscribers()->paginate(),
                'Subscriber added successfully');

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
                ->post(env('RAZORPAY_BASE_URL') . '/orders', [
                    'amount' => Util::COURSE_AMOUNT,
                    'currency' => 'INR',
                    'receipt' => "" . now()->getTimestamp(),
                ]);
            if ($response->status() == 200) {

                $result = json_decode($response->body(), true);

                DB::beginTransaction();

                $currentUser = Auth::user();
                $currentUser->name = $request->get('full_name');
                $currentUser->save();

                $sub = Subscription::create([
                    'user_id' =>$currentUser->id,
                    'father_name' => $request->get('father_name'),
                    'address' => $request->get('address'),
                    'course_id' => $request->get('course_id'),
                    'order_id' => $result['id'],
                    'receipt' => $result['receipt'],
                    'status' => 'draft',
                    'expired_at' => Carbon::now()->addDays(365),
                ]);

                DB::commit();
                return $this->handleResponse($sub, 'Order created successfully');
            }else{
                throw new \Exception('Opps! Something wrong');
            }
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->handlingException($exception);
        }
    }
}
