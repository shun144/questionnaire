<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Password;

class AuthenticatedSessionController extends Controller
{
    /**
     * ログイン画面の表示
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    // /**
    //  * 受信した認証リクエストを処理する
    //  */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     // 認証を実行
    //     $request->authenticate();

    //     // セッションIDを再生成(CSRFトークンも再作成している)
    //     $request->session()->regenerate();

    //     // // セッションIDの再生成(CSRFトークンは再作成しない)
    //     // $request->session()->migrate();

    //     // 認証済みのユーザーを取得
    //     $user = Auth::user();

    //     // 初回ログイン済みでないユーザはパスワードリセットを強制
    //     if (!$user->is_first_loggedin) {

    //         // セッション削除
    //         // セッション削除をしないとパスワードリセットをせずにURLを変更するとログインできてしまう
    //         $request->session()->flush();

    //         // パスワードリセットトークンを生成
    //         $token = Password::createToken($user);
    
    //         // 初回ログイン済みフラグをTrueに更新
    //         $user->is_first_loggedin = true;
    //         $user->save();

    //         // dd(session("url.intended"));

    //         // // セッションのリダイレクト情報をクリア
    //         // session()->forget('url.intended');
    
    //         // パスワードリセットページにリダイレクト
    //         return to_route('password.reset', ['token' => $token]);
    //     }

    //     // dd('shun');
    //     return redirect()->intended(route('dashboard', absolute: false));
    // }


    /**
     * 受信した認証リクエストを処理する
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
        // return redirect('/');
    }



    // /**
    //  * ログイン後のリダイレクト先カスタマイズ
    //  * 
    //  */
    // public function authenticated(Request $request, $user)
    // {

    //     dd(!$user->is_first_loggedin);
    //     if (!$user->is_first_loggedin) {
    //         // パスワードリセットトークンを生成
    //         $token = Password::createToken($user);
    
    //         // 初回ログイン済みフラグをTrueに更新
    //         $user->is_first_loggedin = true;
    //         $user->save();
    
    //         // パスワードリセットページにリダイレクト
    //         return to_route('password.reset', ['token' => $token]);
    //         // return redirect()->route('password.reset', ['token' => $token, 'email' => $user->email]);
    //     }
    
    //     return redirect()->intended(route('dashboard', absolute: false));
    //     // return redirect()->intended($this->redirectPath());
    // }

}
