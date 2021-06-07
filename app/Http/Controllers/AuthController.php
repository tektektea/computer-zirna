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
                'phone_no'=>'required|digit:10'
            ]);

            $user=User::create([
                'phone_no' => $request->get('phone_no'),
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password'))
            ]);
            $token = $user->createToken('access-token',PermissionUtil::userPerms());
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
            $request->user()->tokens()->delete();
            Auth::logout();
            return $this->handleResponse(['logged' => false], '');
        } catch (Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function login(Request $request)
    {
        try {
            if (!Auth::attempt(['email' => $request->get('email'), 'password' => $request->get('password')]))
                throw new Exception(Lang::get('Invalid credential'), 400);

            $user = Auth::user();

            $perms=$user->type === 'ADMIN' ? PermissionUtil::adminPerms() : PermissionUtil::userPerms();

            $token = $user->createToken('access-token',$perms)->plainTextToken;
            return $this->handleResponse([
                'logged'=>true,
                'token' => $token
            ],'');

        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
