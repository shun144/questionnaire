<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FirstLoginController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        $user = Auth::user();

        // パスワードリセットトークン作成
        // password_reset_tokensテーブルに自動でレコード追加
        $token = app('auth.password.broker')->createToken($user);
                
        return Inertia::render('Auth/FirstLogin', [
            'token' =>  $token,
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'terms_check' => ['required', 'accepted'],
        ], [
            'terms_check.accepted' => '利用規約への同意は必須です。', 
        ]);

        

        // if (Hash::check($request->password, $user->password)) {
        //     return back()->withErrors(['password' => '初回パスワードと同じパスワードは使えません']);
        // } 

        // password_resetsテーブルに保存されたトークンと入力されたトークンを比較して有効性を確認。
        // 成功時にはコールバック関数（ユーザーのパスワードを更新）を実行する
        $status = Password::reset(
            $request->only('email','password', 'password_confirmation', 'token'),
            
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'force_password_reset' => false,

                    // ログイン状態を記憶するトークン
                    'remember_token' => Str::random(60),
                ])->save();

                // // PasswordResetイベントを発行します。これを使うことで、例えば「パスワード変更通知メール」を送るなどの処理を実行できます。
                // event(new PasswordReset($user));
            }
        );


        // パスワードリセットが成功した場合にこのブロックが実行
        if ($status == Password::PASSWORD_RESET) {
            return to_route('dashboard');
            // return redirect()->route('login')->with('status', __($status));
        }

        throw ValidationException::withMessages([
            // vendor\askdkc\breezejp\stubs\lang\ja\passwords.php
            'email' => [trans($status)],
        ]);
    }

    // public function store(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => ['required', 'confirmed', Rules\Password::defaults()],
    //     ]);

    //     $user = Auth::user();

    //     // dd($token);

    //     if ($user->email != $request->email) {
    //         return back()->withErrors(['email' => 'メールアドレスが間違っています']);
    //     } 

    //     if (Hash::check($request->password, $user->password)) {
    //         return back()->withErrors(['password' => '初回パスワードと同じパスワードは使えません']);
    //     } 
        
    //     // if ($user->password != Hash::make($request->password)) {
    //     //     return back()->withErrors(['password' => '同じパスワードは使えません']);
    //     // } 

    //     $user->password = Hash::make($request->password);
    //     $user->force_password_reset = false;
    //     $user->save();

    //     // セッションIDを再生成(CSRFトークンも再作成している)
    //     $request->session()->regenerate();

    //     return to_route('dashboard');

    // }
}


