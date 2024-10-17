<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;


// use Illuminate\Support\Facades\Route;//追加
use Illuminate\Http\Request;
// use Illuminate\Auth\Middleware\RedirectIfAuthenticated;//追加
// use Illuminate\Support\Facades\Auth;//追加


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        
        // // 追加
        // then: function () {
        //     Route::middleware('web')
        //         ->prefix('admin')
        //         ->name('admin.')
        //         ->group(base_path('routes/admin.php'));
        // },
        // // 追加
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // $middleware->redirectGuestsTo(function(Request $request) {
        //     if (request()->routeIs('admin.*')) {
        //         return $request->expectsJson() ? null : route('admin.login');
        //     }
        //     return $request->expectsJson() ? null : route('login');
        // });



        // $middleware->redirectGuestsTo(function ($request) {
        //     return $request->is('admin*') ? route('admin.login') : route('login');
        // });

        // $middleware->redirectGuestsTo(function (Request $request) {
        //     if ($request->routeIs('admin.*')) {
        //         return route('admin.login');
        //     }

        //     return route('login');
        // });

        // $middleware->redirectGuestsTo (function () { 
        //     if ( str_starts_with ( request ()-> path (), 'admin' )) { 
        //         return  route ( 'login.admin' ); 
        //     } 
        //     return  route('login'); 
        // }); 

        // // 追加
        // RedirectIfAuthenticated::redirectUsing(function() {
        //     $currentGuard = Auth::guard();

        //     switch ($currentGuard->name) {
        //         case 'lbenz':
        //             return redirect()->route('lbenz.dashboard');

        //         case 'lbenz_contacts':
        //             return redirect()->route('lbenz.user.dashboard');

        //         default:
        //             return redirect()->route('zsc.dashboard');
        //     }
        // });




        // $middleware->redirectGuestsTo(function (Request $request) {
        //     $request->is('admin*') ? route('admin.login') : route('login');
        // });

        // if (Auth::guard('admin')->check()) {
        //     return route('admin.dashboard');
        // };
        // return route('dashboard');

        
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
