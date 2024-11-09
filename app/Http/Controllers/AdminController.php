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
use App\Http\Requests\ProfileUpdateRequest as UserProfileUpdateRequest;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use App\Rules\ProhibitedNames;
use Illuminate\Support\Facades\File;

class AdminController extends Controller
{
    /**
     * ユーザ一覧を取得
     */
    public function getUserList(){
        try {
                    
            $records = DB::table('users')
            ->select('id','name', 'english_name', 'email', 'first_password')
            ->get();
            
            return Inertia::render('Admin/User/Index', [
                'initialUsers' =>  $records,
                'success' => session('success'),
                'fail' => session('fail'),
            ]);
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');

            // セッションにエラーメッセージを格納
            session()->flash('fail', 'ユーザーリストの取得中にエラーが発生しました。');

            return Inertia::render('Admin/User/Index', [
                'initialUsers' =>  [],
                'fail' => session('fail'),
            ]);
        }
    }


    /**
     * ユーザ作成画面へ遷移
     */
    public function create(){
        return Inertia::render('Admin/User/Create');
    }

    /**
     * ユーザ作成
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'english_name' => [
                'required',
                'string',
                'max:15',
                'alpha_num:ascii',
                'unique:'.User::class,
                new ProhibitedNames(['admin', 'login']),
            ],
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required',  Rules\Password::defaults()],
        ],);

        try {
            $user = User::create([
                'name' => $validatedData['name'],
                'english_name' => $validatedData['english_name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'first_password' => $validatedData['password'],
            ]);
    
            return to_route('admin.dashboard')->with('success', 'ユーザを追加しました');
        } catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return to_route('admin.dashboard')->with('fail', 'ユーザの追加に失敗しました');
        } 
    }

    /**
     * ユーザ編集画面へ遷移
     */
    public function edit($id)
    {
        try {

            $user_records = DB::table('users')
            ->where('id', $id)
            ->select('name', 'english_name','email', 'first_password')
            ->first();
    
            return Inertia::render('Admin/User/Edit', [
                'id' => $id,
                'initialName' =>  $user_records->name,
                'initialEnglishName' =>  $user_records->english_name,
                'initialEmail' =>  $user_records->email,
                'initialFirstPassword' =>   $user_records->first_password,
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return to_route('admin.dashboard')->with('fail', 'ユーザ編集画面の表示に失敗しました');
        }
    }


    /**
     * ユーザ編集
     */
    public function update($id, UserProfileUpdateRequest $request): RedirectResponse
    {
        $params = $request->only(['name','english_name', 'email', 'first_password']);

        try {
            DB::table('users')
            ->where('id', $id)
            ->update([
                'name' => $params['name'],
                'english_name' => $params['english_name'],
                'email' => $params['email'],
                'first_password' => $params['first_password'],
                'password' => Hash::make($params['first_password']),
                'updated_at' => Carbon::now(),
            ]);
            return to_route('admin.dashboard')->with('success', 'ユーザを更新しました');
        } catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return to_route('admin.dashboard')->with('fail', 'ユーザ更新に失敗しました');
        }
    }

    /**
     * ユーザ削除
     */
    public function destroy($id)
    {
        try {
            $deleted = User::destroy($id);
    
            if ($deleted) {
                return to_route('admin.dashboard')->with('success', 'ユーザを削除しました');
            } else {
                return to_route('admin.dashboard')->with('fail', '削除対象のユーザが見つかりませんでした');
            }
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');
            return to_route('admin.dashboard')->with('fail', 'ユーザ削除に失敗しました');
        }
    }

    /**
     * ログファイル一覧を取得
     */
    public function getLogList(){
        try {

            $path = public_path('logs');

            // ディレクトリの存在確認
            if (!File::exists($path)) {
                Log::error("Logs directory does not exist at path: $path");
                return [];
            }

            // ファイル取得とURL変換
            $logFiles = File::files($path);
            $logFilesArray = [];

            foreach ($logFiles as $file) {
                $logFilesArray[] = [
                    'name' => $file->getFilename(),
                    'url' => url('logs/' . $file->getFilename())
                ];
            }

            // ファイル名の降順にソート
            usort($logFilesArray, function ($a, $b) {
                return strcmp($b['name'], $a['name']); // 名前で降順ソート
            });

            return Inertia::render('Admin/Log/Index', [
                'initialLogs' =>  $logFilesArray,
                'success' => session('success'),
                'fail' => session('fail'),
            ]);

        }
        catch (\Exception $e) {
            \Log::error($e->getMessage().'(errLine.'.$e->getLine().')');

            // セッションにエラーメッセージを格納
            session()->flash('fail', 'ログ一覧取得中にエラーが発生しました。');

            return Inertia::render('Admin/User/Index', [
                'initialLogs' =>  [],
                'fail' => session('fail'),
            ]);
        }
    }


}
