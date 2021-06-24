<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

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
    public function createOrder(Request $request)
    {
        try {
            $this->validate($request->all(), [
                'full_name' => 'required',
                'father_name' => 'required',
                'address' => 'required',
            ]);
            $currentUser = $request->user();
            $currentUser->name = $request->get('full_name');
            $currentUser->save();
            $sub=Subscription::create([
                'user_id' => $request->user()->id,
                'father_name' => $request->get('father_name'),
                'address' => $request->get('address'),
            ]);

            return $this->handleResponse($sub, 'Order detailed created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
