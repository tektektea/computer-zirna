<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\PermissionUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class OtpController extends Controller
{
    const SEND_URL = 'https://api.msg91.com/api/v5/otp';
    const VERIFY_URL = 'https://api.msg91.com/api/v5/otp/verify';
    const RETRY_URL = 'https://api.msg91.com/api/v5/otp/retry';

//"{"message":"Auth Key missing","type":"error"}"

    public function verify(Request $request)
    {
        try {
            $this->validate($request->only('otp', 'phone_no'), [
                'phone_no' => 'required',
                'otp' => 'required',
            ]);

            $response = Http::get(self::VERIFY_URL, [
                'authkey' => env('MSG91_AUTH_KEY'),
                'mobile' => $request->get('phone_no'),
                'otp' => $request->get('otp'),
            ]);
            $result = json_decode($response->body(), true);
            if ($result['type'] === 'error') {
                throw new \Exception($result['message'], 400);
            }
            $user = User::create([
                'phone_no' => $request->get('phone_no'),
                'type' => 'appuser'
            ]);
            $token = $user->createToken('access-token', PermissionUtil::userPerms());
            Auth::login($user);

            return $this->handleResponse($token->plainTextToken, 'Otp verified');

        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function resend(Request $request)
    {
        try {
            $this->validate($request->only('phone_no'), [
                'phone_no' => 'required',
            ]);

            $response = Http::get(self::RETRY_URL, [
                'authkey' => env('MSG91_AUTH_KEY'),
                'mobile' => $request->get('phone_no'),
                'retrytype' => 'text',
            ]);
            $result = json_decode($response->body(), true);
            if ($result['type'] === 'error') {
                throw new \Exception($result['message'], 400);
            }
            $this->handleResponse($request->get('phone_no'), 'Otp sent');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function send(Request $request)
    {
        try {
            $this->validate($request->only('phone_no'), [
                'phone_no' => 'required'
            ]);
            $response = Http::get(self::SEND_URL, [
                'template_id' => env('MSG91_TEMPLATE_ID'),
                'authkey' => env('MSG91_AUTH_KEY'),
                'mobile' => $request->get('phone_no')
            ]);
            $result = json_decode($response->body(), true);
            if ($result['type'] === 'error') {
                throw new \Exception($result['message'], 400);
            }
            return $this->handleResponse($request->get('phone_no'), 'Otp sent');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }

    }
}
