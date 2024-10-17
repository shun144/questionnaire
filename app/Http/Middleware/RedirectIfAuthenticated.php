<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Closure;

// class RedirectIfAuthenticated extends Middleware
class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, ...$guards)
    {
        // dd($request);
        $guards = empty($guards) ? [null] : $guards;
        // dd($guards);
    
        // return Redirect::route('admin.dashboard');
        // return $request->is('admin*') ? Redirect::route('admin.dashboard') : Redirect::route('dashboard');

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {

                if($guard == 'admin') {
                    return Redirect::route('admin.dashboard');
                }

                return Redirect::route('dashboard');

                // if($guard == 'admin') return redirect(RouteServiceProvider::ADMIN_HOME);
                // return redirect(RouteServiceProvider::HOME);
            }
        }
    
        return $next($request);
    }
}
