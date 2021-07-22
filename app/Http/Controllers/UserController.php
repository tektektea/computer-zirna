<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class UserController extends Controller
{
    public function all(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('view:user');
            if (!$permit) {
                throw  new \Exception('Permission denied', 403);
            }
            return $this->handleResponse(User::query()->where('type','admin')->paginate(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function create(Request $request)
    {
        try {
            $permit=$request->user()->tokenCan('create:user');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $this->validate($request->only(['name','phone_no', 'email', 'password','password_confirmation']), [
                'name'=>'required',
                'phone_no' => 'required|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed|min:6'
            ]);
            $user=User::create([
                'name' => $request->get('name'),
                'phone_no' => $request->get('phone_no'),
                'email' => $request->get('email'),
                'father_name' => $request->get('father_name'),
                'address' => $request->get('address'),
                'password' => Hash::make('password'),
                'type'=>'admin'
            ]);

            return $this->handleResponse(User::query()->where('type','admin')->paginate(), 'User created successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function update(Request $request,User $user)
    {
        try {
            $permit=$request->user()->tokenCan('update:user');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $this->validate($request->only(['name','phone_no', 'email', 'password']), [
                'name'=>'required',
                'phone_no' => 'required|digit:10',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed|min:6'
            ]);
            $user->name = $request->get('name');
            $user->email = $request->get('email');
            $user->phone_no = $request->get('phone_no');
            $user->password = Hash::make($request->get('password'));
            $user->save();

            return $this->handleResponse($user, 'User updated successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function delete(Request $request,User $user)
    {
        try {
            $permit=$request->user()->tokenCan('delete:user');
            if (!$permit) {
                throw new \Exception('Permission denied', 403);
            }
            $user->delete();

            return $this->handleResponse(User::query()->where('type','admin')->paginate(),
                'User deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
