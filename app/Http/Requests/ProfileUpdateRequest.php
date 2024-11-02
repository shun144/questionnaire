<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'english_name' => [
                'required', 
                'string', 
                'max:15',
                'alpha_num:ascii',
                Rule::unique(User::class)->ignore($this->user()->id),
                function ($attribute, $value, $fail) {
                    $prohibitedNames = ['admin', 'login'];
                    if (in_array(strtolower($value), array_map('strtolower', $prohibitedNames))) {
                        $fail('入力された文字は登録できません。');
                    }
                },
            ],
            'email' => [
                'required', 
                'string', 
                'lowercase', 
                'email', 
                'max:255', 
                Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }

    // public function messages(): array
    // {
    //     return [
    //         'english_name.not_in' => '入力された文字は登録できません。', // english_nameフィールドのカスタムエラーメッセージ
    //     ];
    // }
}
