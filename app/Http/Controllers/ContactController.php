<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function create(Request $request)
    {
        try {
            $contact=Contact::query()->create($request->only(['name', 'email', 'phone', 'message']));
            return $this->handleResponse($contact, 'Contact created successfully');
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
