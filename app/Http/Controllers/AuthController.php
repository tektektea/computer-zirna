<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\PermissionUtil;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;

class AuthController extends Controller
{
    public function createAccount(Request $request): JsonResponse
    {
        try {
            $this->validate($request->only(['email', 'password', 'phone_no']), [
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'phone_no' => 'required|digit:10'
            ]);

            $user = User::create([
                'phone_no' => $request->get('phone_no'),
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password'))
            ]);
            $token = $user->createToken('access-token', PermissionUtil::userPerms());
            Auth::login($user);
            return $this->handleResponse([
                'token' => $token
            ], 'Account created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->delete();
            return $this->handleResponse(['logged' => false], '');
        } catch (Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function login(Request $request)
    {
        try {

            if (!Auth::attempt([
                'email' => $request->get('email'),
                'password' => $request->get('password')
            ]))
                throw new Exception(Lang::get('Invalid credential'), 400);

            $user = Auth::user();

            if ($user->type === 'appuser') {
                throw new Exception("Permission denied: User portal is coming soon!");
            }
            $perms = $user->type === 'admin' ? PermissionUtil::adminPerms() : PermissionUtil::userPerms();

            $token = $user->createToken('access-token', $perms)->plainTextToken;
            return $this->handleResponse(
                $token, '');

        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return $this->handleResponse($user);
    }
    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();
            $this->validate($request->only(['']), [
                'email' => 'required:unique:users',
                'password' => 'required:confirmed'
            ]);
            $user->update([
                'full_name' => $request->get('full_name'),
                'email' => $request->get('email'),
                'password' => Hash::make('password')
            ]);
            return $this->handleResponse($user,'User updated successfully');
        } catch (Exception $exception) {
            return $this->handlingException($exception);
        }

    }
}
