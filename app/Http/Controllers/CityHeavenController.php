<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Fluent;
use App\Http\Requests\CityHeavenRequest;

class CityHeavenController extends Controller
{
    // public function update(Request $request): RedirectResponse
    public function update(CityHeavenRequest $request): RedirectResponse
    {
        $params = $request->only(['access_key', 'shop_id']);

        $user_id = Auth::user()->id;
        $now = Carbon::now();

        $encrypted_access_key = Crypt::encryptString($params['access_key']);
        $encrypted_shop_id =  Crypt::encryptString($params['shop_id']);

        $masked_access_key = $this->maskString($params['access_key'],2);
        $masked_shop_id =  $this->maskString($params['shop_id'], 2);

        if (DB::table('city_heavens')->where('user_id', $user_id)->exists()) {

            DB::table('city_heavens')
            ->where('user_id', $user_id)
            ->update([
                'access_key' => $encrypted_access_key,
                'shop_id' => $encrypted_shop_id,
                'masking_access_key' => $masked_access_key,
                'masking_shop_id' => $masked_shop_id,
                'updated_at' => $now,
            ]);
        } else {
            DB::table('city_heavens')->insert([
                'access_key' => $encrypted_access_key,
                'shop_id' => $encrypted_shop_id,
                'masking_access_key' => $masked_access_key,
                'masking_shop_id' => $masked_shop_id,
                'user_id' => $user_id,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
        return Redirect::route('setting');
    }

    private function maskString($string, $keepLength=3):string {
        return "..." . substr($string, -1 * ($keepLength));
    }

}
