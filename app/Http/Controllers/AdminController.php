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



class AdminController extends Controller
{
    public function getUserList(){
        try {
                    
            $records = DB::table('users')
            ->select('id','name', 'english_name', 'email')
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
            'english_name' => 'required|string|max:15|alpha_num|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required',  Rules\Password::defaults()],
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'english_name' => $request->english_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return to_route('admin.dashboard')->with('success', 'ユーザを追加しました');
            
        // return redirect(route('admin.dashboard', absolute: false));
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
