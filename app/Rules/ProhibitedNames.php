<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ProhibitedNames implements ValidationRule
{

    protected array $prohibitedNames;

    public function __construct(array $prohibitedNames)
    {
        $this->prohibitedNames = array_map('strtolower', $prohibitedNames);
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string = null): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (in_array(strtolower($value), $this->prohibitedNames)) {
            $fail('入力された文字は登録できません');
        }
    }
}
