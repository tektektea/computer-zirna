<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function create(Request $request)
    {
        try {
            $this->validate($request->only(['name','email','phone','message']),[
                'name'=>'required',
                'email'=>'required',
                'phone'=>'required',
                'message'=>'required',
            ]);
            $contact=Contact::query()->create($request->only(['name', 'email', 'phone', 'message']));
            return $this->handleResponse($contact, 'Message submitted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
    public function index(Request $request)
    {
        try {
            return $this->handleResponse(Contact::query()->paginate(), '');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }

    public function delete(Request $request, Contact $contact)
    {
        try {
            $contact->delete();
            return $this->handleResponse(Contact::query()->paginate(), 'Contact deleted successfully');
        } catch (\Exception $exception) {
            return $this->handlingException($exception);
        }
    }
}
