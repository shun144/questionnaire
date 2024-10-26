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
            'english_name' => 'required|string|max:15|alpha_num:ascii|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required',  Rules\Password::defaults()],
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'english_name' => $request->english_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'first_password' => $request->password,
        ]);

        return to_route('admin.dashboard')->with('success', 'ユーザを追加しました');
            
        // return redirect(route('admin.dashboard', absolute: false));
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
            // 'success' => session('success')
        ]);
        
        // return Inertia::render('Admin/Profile/Edit', [
        //     'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        //     'status' => session('status'),
        // ]);
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

        // $val = $request->user()->fill($request->validated());

        // dd($request->user());

//    if ($user->save()) {
//         return Redirect::route('admin.user.edit', ['id' => $user->id])
//             ->with('success', 'ユーザー情報が更新されました');
//     }

//     return back()->withErrors(['error' => 'ユーザー情報の更新に失敗しました']);

        // dd($request->validated(), $request->user()->getDirty());

        // $request->user()->save();


        // return to_route('admin.user.edit', ['id' => 1])->with('success', 'ユーザを更新しました');

        return to_route('admin.dashboard')->with('success', 'ユーザを更新しました');

        // return Redirect::route('admin.user.edit', ['id' => 1]);
        // return Redirect::route('admin.user.edit');

    }



    public function destroy($id)
    {
        User::destroy($id);
        // return Redirect::route('admin.dashboard', ['success' => 'ユーザを削除しました']);
        return to_route('admin.dashboard')
            ->with('success', 'ユーザを削除しました');
    }

    // public function getUserList(){
    //     try {
           
            
    //         $records = DB::table('users')
    //         ->select('id','name', 'english_name', 'email')
    //         ->get();
    //         $datas = isset($records) ? $records: [];
            
    //         return Inertia::render('Admin/User/Index', [
    //             'initialUsers' =>  $datas,
    //         ]);
    //     }
    //     catch (\Exception $e) {
    //         return Inertia::render('Admin/User/Index', [
    //             'initialUsers' =>  [],
    //         ]);
    //     }
    // }
}
