<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Subscription;
use App\Models\User;
use App\utils\SubscriptionEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

    public function videos(Request $request, Course $course)
    {
        try {
            $user = $request->user();
            $sub = Subscription::query()->where('user_id', $user->id)
                ->where('course_id', $course->id)
                ->where('status', 'subscribe')
                ->get();
            if (!$sub) {
                throw new \Exception('Permission denied', 403);
            }
            $videos = $course->videos()->get();
            return $this->handleResponse($videos, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function materials(Request $request, Course $course)
    {
        try {
            $user = $request->user();
            $sub = Subscription::query()->where('user_id', $user->id)
                ->where('course_id', $course->id)
                ->where('status', 'subscribe')
                ->get();
            if (!$sub) {
                throw new \Exception('Permission denied', 403);
            }
            $materials = $course->materials()->get();

            return $this->handleResponse($materials, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function userCourse(Request $request)
    {
        try {
            $user = $request->user();
            $courses_ids = Subscription::query()
                ->where('user_id', $user->id)
                ->where('status', SubscriptionEnum::SUBSCRIBE)
                ->pluck('course_id');
            $courses = Course::query()
                ->with(['subjects', 'materials'])
                ->findMany($courses_ids);

            return $this->handleResponse($courses, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function verify(Request $request)
    {
        try {
            $this->validate($request->only(['razorpay_order_id', 'subscription_id', 'razorpay_payment_id', 'razorpay_signature']), [
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
                $subscription = Subscription::query()->find($request->get('subscription_id'));
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

    public function renew(Request $request, Subscription $subscription)
    {
        try {
            $this->validate($request->only(['expired_at']), [
                'expired_at' => 'required',
            ]);
            $subscription->expired_at = new Carbon($request->get('expired_at'));
            $subscription->save();

            return $this->handleResponse($subscription, 'Subscription renewed successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function unblock(Request $request, Subscription $subscription)
    {
        try {

            $subscription->status = 'subscribe';
            $subscription->save();

            return $this->handleResponse($subscription, 'Subscription unblocked successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function block(Request $request, Subscription $subscription)
    {
        try {

            $subscription->status = 'cancelled';
            $subscription->save();

            return $this->handleResponse($subscription, 'Subscription blocked successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function subscribers(Request $request)
    {
        try {
            $search = $request->get('search');
            $data = User::subscribers()
                ->when($search, function (Builder $builder) use ($search) {
                    $builder->where('name', 'LIKE', "%$search%");
                })
                ->paginate();
            return $this->handleResponse($data, '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function getSubscriptions(Request $request, User $user)
    {
        try {
            return $this->handleResponse($user->subscriptions()->get());
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function deleteSubscription(Request $request, Subscription $subscription)
    {
        try {
            $subscription->delete();
            $user = $request->user();
            return $this->handleResponse($subscription,
                'Subscription deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function createSubscriber(Request $request): JsonResponse
    {
        try {
            $this->validate($request->only([
                'courses', 'name', 'phone_no', 'father_name', 'address', 'email', 'dob', 'expired_date', 'expired_time'
            ]), [
                'courses' => 'required',
                'name' => 'required',
                'father_name' => 'required',
                'address' => 'required',
                'dob' => 'required',
                'expired_date' => 'required',
                'expired_time' => 'required'
            ]);
            $courses = array_values($request->get('courses'));

            DB::transaction(function () use ($courses, $request) {

                $user = User::query()->where('phone_no', $request->get('phone_no'))
                    ->orWhere('email', $request->get('email'))
                ->first();
                if ($user) {
                    $user->update([
                        'name' => $request->get('name'),
                        'father_name' => $request->get('father_name'),
                        'dob' => $request->get('dob'),
                        'phone_no' => $request->get('phone_no'),
                        'email' => $request->get('email'),
                        'address' => $request->get('address')
                    ]);
                    $user->save();
                }else{
                    $user = User::query()->create([
                        'name' => $request->get('name'),
                        'father_name' => $request->get('father_name'),
                        'dob' => $request->get('dob'),
                        'phone_no' => $request->get('phone_no'),
                        'email' => $request->get('email'),
                        'address' => $request->get('address')
                    ]);
                }
                $date = $request->get('expired_date');
                $time = $request->get('expired_time');

                $subscriptions = collect($courses)->map(function ($course_id) use ($time, $date, $user, $request) {
                    $subscription = Subscription::query()
                        ->where('user_id', $user->id)
                        ->where('course_id', $request->get('course_id'))
                        ->latest()
                        ->first();
                    if ($subscription) {
                         return $subscription->update([
                            'course_id' => $course_id,
                            'expired_at' => Carbon::createFromFormat('Y-m-d H:i:s', $date . ' ' . $time),
                            'user_id' => $user->id,
                            'order_id' => "MANUALLY ADDED",
                            'receipt' => "MANUALLY ADDED",
                            'status' => SubscriptionEnum::SUBSCRIBE,
                        ]);

                    }
                    return  Subscription::query()->create([
                        'course_id' => $course_id,
                        'expired_at' => Carbon::createFromFormat('Y-m-d H:i:s', $date . ' ' . $time),
                        'user_id' => $user->id,
                        'order_id' => "MANUALLY ADDED",
                        'receipt' => "MANUALLY ADDED",
                        'status' => SubscriptionEnum::SUBSCRIBE,
                    ]);
                });
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
            $currentUser = Auth::user();
            $this->validate($request->only(['full_name', 'father_name', 'address', 'course_id']), [
                'full_name' => 'required',
                'father_name' => 'required',
                'address' => 'required',
                'course_id' => 'required',
            ]);

            $subscription = Subscription::query()
                ->where('user_id', $currentUser->id)
                ->where('course_id', $request->get('course_id'))
                ->latest()
            ->first();

            if ($subscription) {
                switch ($subscription->status) {
                    case SubscriptionEnum::DRAFT:
                        return $this->handleResponse($subscription, '');
                    case SubscriptionEnum::SUBSCRIBE:
                        throw new \Exception('Course purchased already');
                    case SubscriptionEnum::CANCELLED:
                        throw new \Exception('Your subscription is cancelled, You are unable to purchase this course right now.Please contact us');
                    default:
                        break;
                }

            }
            $course = Course::query()->find($request->get('course_id'));
            $username = env('RAZOR_KEY_ID');
            $password = env('RAZOR_SECRET_KEY');
            $response = Http::withBasicAuth($username, $password)
                ->post(env('RAZORPAY_BASE_URL') . '/orders', [
                    'amount' => $course->price * 100,
                    'currency' => 'INR',
                    'receipt' => "" . now()->getTimestamp(),
                ]);
            if ($response->status() == 200) {

                $result = json_decode($response->body(), true);

                $sub = DB::transaction(function () use ($result, $subscription, $course, $request, $currentUser) {
                    $currentUser->name = $request->get('full_name');
                    $currentUser->father_name = $request->get('father_name');
                    $currentUser->dob = $request->get('dob');
                    $currentUser->address = $request->get('address');
                    $currentUser->save();

                    return Subscription::create([
                        'user_id' => $currentUser->id,
                        'course_id' => $course->id,
                        'order_id' => $result['id'],
                        'receipt' => $result['receipt'],
                        'status' => 'draft',
                        'expired_at' => Carbon::now()->addDays(365),
                    ]);
                });
                return $this->handleResponse($sub, 'Order created successfully');
            } else {
                Log::error('error ' . $response->body());
                throw new \Exception('Opps! Something wrong');
            }

        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
