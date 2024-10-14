<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\OwnerContoller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Owner/MainBoard'))->name('dashboard');

    // Route::get('/flows', [OwnerContoller::class, 'getFlows']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/question-nodes', [OwnerContoller::class, 'getQuestionNodes']);
    Route::get('/result-nodes', [OwnerContoller::class, 'getResultNodes']);
    Route::get('/edges', [OwnerContoller::class, 'getEdges']);
    
    Route::post('/commit', [OwnerContoller::class, 'commit']);

    Route::get('/flows', [OwnerContoller::class, 'getFlows']);
    Route::post('/flow', [OwnerContoller::class, 'addFlow']);

    Route::get('/firstQuestionId', [OwnerContoller::class, 'getFirstQuestionId']);


    Route::get('/flow/{category}/{flowId}', function ($category, $flowId) {
        return Inertia::render('Owner/flow/FlowLayout', [
            'flowId' => $flowId,
            'category' => $category,
        ]);
    })->name('flowlayout');



    // Route::post('/upload', function (Request $request) {
    //     $request->validate([
    //         'images.*' => 'nullable|image|max:2048', // 複数の画像のバリデーション
    //     ]);
    
    //     $paths = [];
    //     foreach ($request->file('images') as $file) {
    //         if ($file) {
    //             $path = $file->store('uploads', 'public');
    //             $paths[] = $path;
    
    //             // DBにパスを保存する場合
    //             // YourModel::create(['image_path' => $path]);
    //         }
    //     }
    //     return response()->json(['paths' => $paths], 201);
    // });


});

Route::get('/{owner}/{flowUrl}', function ($owner, $flowUrl) {
    return Inertia::render('Questionnaire/Index', [
        'flowUrl' => $flowUrl, // ルートパラメータを渡す
    ]);
});

Route::get('/{owner}/{flowUrl}/questionnaire', [QuestionnaireController::class,'getQuestionnair']);
Route::get('/{owner}/{flowUrl}/firstQuestionId', [QuestionnaireController::class,'getFirstQuestionId']);


Route::get('/{owner}/{flowUrl}/test', [ApiController::class, 'testCallApi'])->name('testCallApi');

require __DIR__.'/auth.php';




// Route::get('/{category}/{flowUrl}', function ($flowUrl) {
//     return Inertia::render('Questionnaire/Index', [
//         'flowUrl' => $flowUrl, // ルートパラメータを渡す
//     ]);
// })->where('flowUrl', '^(?!login$).*$');



// Route::get('/', function () {
//     return Inertia::render('Questionnaire/Index');
// });

// Route::get('/', fn() => Inertia::render('Questionnaire/Index'));

// Route::get('/{url}', fn() => Inertia::render('Questionnaire/Index'));



// Route::get('/questionnaire', [QuestionnaireController::class,'getQuestionnair']);





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



// Route::get('/dashboard', function () {
//     return Inertia::render('Owner/MainBoard');
// })->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('/dashboard/{id}', function () {
//     return Inertia::render('Owner/MainBoard',[
//         'greeting' => 'Hello'
//     ]);
// })->name('dashboard');
// Route::get('/dashboard/{id}', [OwnerContoller::class, 'getFlows'])->name('dashboard');
// Route::get('/dashboard/{id}', [OwnerContoller::class, 'getFlows'])->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/dashboard', function () {
//     return Inertia::render('Owner/MainBoard',[
//         'greeting' => 'Hello'
//     ]);
// })->middleware(['auth', 'verified'])->name('dashboard');





