<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;



return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->redirectGuestsTo(function (Request $request) {

            if ($request->routeIs('admin.*')) {
                return route('admin.login');
            }
            return route('login');
        });

        $middleware->redirectUsersTo(function (Request $request) { 
            if ($request->routeIs('admin.*')) {
                return route('admin.dashboard');
            }
            return route('dashboard');

            // if (request()->routeIs('admin.*')) {
            //     return '/admin/dashboard';
            // }
            // return '/dashboard';
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
