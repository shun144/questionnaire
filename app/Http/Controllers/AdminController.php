<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use App\Models\User;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Http\Requests\ProfileUpdateRequest as UserProfileUpdateRequest;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function getUserList(){
        try {
                    
            $records = DB::table('users')
            ->select('id','name', 'english_name', 'email', 'first_password')
            ->get();
            $datas = isset($records) ? $records: [];
            
            return Inertia::render('Admin/User/Index', [
                'initialUsers' =>  $datas,
                'success' => session('success')
            ]);
        }
        catch (\Exception $e) {
            return Inertia::render('Admin/User/Index', [
                'initialUsers' =>  [],
            ]);
        }
    }

    public function create(){
        return Inertia::render('Admin/User/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'english_name' => [
                'required',
                'string',
                'max:15',
                'alpha_num:ascii',
                'unique:'.User::class,
                function ($attribute, $value, $fail) {
                    $prohibitedNames = ['admin', 'login'];
                    if (in_array(strtolower($value), array_map('strtolower', $prohibitedNames))) {
                        $fail('入力された文字は登録できません');
                    }
                },
            ],
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required',  Rules\Password::defaults()],
        ],);

        $user = User::create([
            'name' => $request->name,
            'english_name' => $request->english_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'first_password' => $request->password,
        ]);

        return to_route('admin.dashboard')->with('success', 'ユーザを追加しました');
    }


    public function edit($id)
    {
        $user_records = DB::table('users')
        ->where('id', $id)
        ->select('id', 'name', 'english_name','email', 'first_password')
        ->first();

        return Inertia::render('Admin/User/Edit', [
            'id' => $user_records->id,
            'initialName' =>  $user_records->name,
            'initialEnglishName' =>  $user_records->english_name,
            'initialEmail' =>  $user_records->email,
            'initialFirstPassword' =>   $user_records->first_password,
        ]);
    }

    public function update($id, UserProfileUpdateRequest $request): RedirectResponse
    {
        $params = $request->only(['name','english_name', 'email', 'first_password']);
        $now = Carbon::now();
        DB::table('users')
        ->where('id', $id)
        ->update([
            'name' => $params['name'],
            'english_name' => $params['english_name'],
            'email' => $params['email'],
            'first_password' => $params['first_password'],
            'password' => Hash::make($params['first_password']),
            'updated_at' => $now,
        ]);
        return to_route('admin.dashboard')
                ->with('success', 'ユーザを更新しました');

    }



    public function destroy($id)
    {
        User::destroy($id);
        return to_route('admin.dashboard')
            ->with('success', 'ユーザを削除しました');
    }

}
