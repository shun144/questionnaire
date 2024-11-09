<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Validation\Validator;

class CityHeavenRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
        // return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'access_key' => ['required', 'max:255'],
            'shop_id' => ['required', 'max:255'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $access_key = $this->input('access_key');
            $shop_id = $this->input('shop_id');

            $client = new Client();

            $API = env('CITY_HEAVEN_API_SHOP_INFO', "");
       
            if($API == "") {
                $validator->errors()->add('access_key', "店舗情報APIのURLが登録されていません。管理者へ確認してください。");
                return;
            }

            // 店舗情報API
            $response = $client->post($API,
                [
                    'form_params' => [
                        'keyid' => $access_key,
                        'shopid' => $shop_id,
                    ]
                ]
            );

            $res_status_code = $response->getStatusCode();
            if ($res_status_code != "200") {
                $error_message ="ステータスコード".$res_status_code."エラーです";
                $validator->errors()->add('access_key', $error_message);
            }

            $res_body = simplexml_load_string($response->getBody());
    
            if (isset($res_body->error)) {
                $error_message = (string) $res_body->error->message;
                $validator->errors()->add('access_key', $error_message);
            }
        });
    }
}