<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\OwnerContoller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Questionnaire/Index');
});

Route::get('/questionnaire', [QuestionnaireController::class,'getQuestionnair']);

Route::get('/test', [ApiController::class, 'testCallApi'])->name('testCallApi');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Owner/MainBoard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/question-nodes', [OwnerContoller::class, 'getQuestionNodes']);
    Route::get('/result-nodes', [OwnerContoller::class, 'getResultNodes']);
    Route::get('/edges', [OwnerContoller::class, 'getEdges']);
    
    Route::post('/commit', [OwnerContoller::class, 'commit']);

    // Route::get('/question-nodes', [OwnerContoller::class, 'getQuestionNodes']);
    // Route::get('/result-nodes', [OwnerContoller::class, 'getResultNodes']);
    // Route::get('/edges', [OwnerContoller::class, 'getEdges']);
    // Route::post('/commit', [OwnerContoller::class, 'commit']);

    // Route::get('/sample-questions', [OwnerContoller::class, 'getSampleQuestionNodes']);
    // Route::post('/sample-questions', [OwnerContoller::class, 'sampleCommit']);
    
    // Route::get('/sample-edges', [OwnerContoller::class, 'getSampleEdges']);
});

require __DIR__.'/auth.php';
