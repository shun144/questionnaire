<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RespondentController;
use App\Http\Controllers\OwnerContoller;
use App\Http\Controllers\CityHeavenController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Owner/board/MainBoard'))->name('dashboard');

    Route::get('/setting', fn() => Inertia::render('Owner/Setting/Edit'))->name('setting');

    // Route::get('/flows', [OwnerContoller::class, 'getFlows']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::put('city-heaven', [CityHeavenController::class, 'update'])->name('cityheaven.update');


    Route::get('/question-nodes', [OwnerContoller::class, 'getQuestionNodes']);
    Route::get('/result-nodes', [OwnerContoller::class, 'getResultNodes']);
    Route::get('/edges', [OwnerContoller::class, 'getEdges']);
    
    Route::get('/flows', [OwnerContoller::class, 'getFlows']);
    Route::post('/flows', [OwnerContoller::class, 'commit']);
    
    Route::get('/flow-info', [OwnerContoller::class, 'getFlowTitleAndUrl']);
    Route::post('/flow', [OwnerContoller::class, 'addFlow']);

    Route::get('/firstQuestionId', [OwnerContoller::class, 'getFirstQuestionId']);


    Route::get('/flow/{category}/{id}', function ($category, $id) {
        
        if ($category === 'cityheaven') {
            return Inertia::render('Owner/flow/cityHeaven/FlowLayout', [ 'id' => $id]);
        } else {
            return Inertia::render('Owner/flow/standard/FlowLayout', [ 'id' => $id]);
        }
    })->name('flowlayout');
});


// アンケート回答
Route::get('/{owner}/{flowUrl}', function ($owner, $flowUrl) {
    return Inertia::render('Respondent/questionnarie/cityHeaven/Index', [ 'flowUrl' => $flowUrl]);
});

Route::get('/{owner}/{flowUrl}/questionnaire', [RespondentController::class,'getQuestionnair']);
Route::get('/{owner}/{flowUrl}/firstQuestionId', [RespondentController::class,'getFirstQuestionId']);


// シティヘブンAPI
Route::get('/{owner}/{flowUrl}/cityheaven', [ApiController::class, 'getCityHeavenGirls']);

require __DIR__.'/auth.php';

