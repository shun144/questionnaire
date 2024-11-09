<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\ProhibitedNames;

class ProfileUpdateRequest extends FormRequest
{
    public function rules(): array
    {

        return [
            'name' => ['required', 'string', 'max:50'],
            'english_name' => [
                'required', 
                'string', 
                'max:15',
                'alpha_num:ascii',
                Rule::unique(User::class)->ignore($this->id), // Formで渡されたユーザIDは無視する
                new ProhibitedNames(['admin', 'login']),
            ],
            'email' => [
                'required', 
                'string', 
                'lowercase', 
                'email', 
                'max:255', 
                Rule::unique(User::class)->ignore($this->id)],
        ];
    }
}
