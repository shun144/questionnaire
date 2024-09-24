<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    // 主キーカラム名を指定
    protected $primaryKey = 'choice_no';

    // オートインクリメント無効化
    public $incrementing = false;
   
    // Laravel 6.0+以降なら主キーの型を指定
    protected $keyType = 'string';

    // public function quize()
    // {
    //     return $this->belongsTo(Quize::class, 'quize_no');
    // }
}
