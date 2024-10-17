<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use GuzzleHttp\Client;

class CityHeavenApiRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string = null): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
    //     if (strtoupper($value) !== $value) {
    //         $fail('The :attribute must be uppercase.');
    //     }

        $client = new Client();

        // 在籍女の子一覧API
        $API_GIRLS_LIST = "http://api.cityheaven.net/ApiGirlsList.php";
        $resApiGirls = $client->post($API_GIRLS_LIST,
            [
                'form_params' => [
                    'keyid' => $access_key,
                    'shopid' => $shop_id,
                ]
            ]
        );

    }
}
