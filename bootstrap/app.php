<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use App\Http\Middleware\ForcePasswordChange;


/**
 * カスタム初期設定
 * basePath：アプリケーションのベースディレクトリ（通常プロジェクトのルートディレクトリ）を設定する
 */
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'force.password.change' => ForcePasswordChange::class
        ]);

        // Webリクエストに適用するミドルウェアを指定
        $middleware->web(append: [
            // Inertia.js リクエストの処理用ミドルウェア
            \App\Http\Middleware\HandleInertiaRequests::class,

            //  プリロードするアセットのための Link ヘッダーを追加するミドルウェア
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // 未認証のリクエスト（ゲストユーザー）が特定の保護されたルートにアクセスした場合に適用
        $middleware->redirectGuestsTo(function (Request $request) {

            // admin.* に一致するルートへのリクエストは admin.loginにリダイレクト。
            if ($request->routeIs('admin.*')) {
                return route('admin.login');
            }

            // // 権限がない場合は403エラーを返す
            // abort(403, 'Unauthorized access.');

            // その他のルートへのリクエストはloginにリダイレクト。
            return route('login');
        });

        // 認証済みのユーザーがログインページなどにアクセスした場合のリダイレクト先を設定
        $middleware->redirectUsersTo(function (Request $request) { 
            if ($request->routeIs('admin.*')) {
                return route('admin.dashboard');
            }
            return route('dashboard');
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
