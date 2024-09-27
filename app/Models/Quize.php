<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quize extends Model
{
    use HasFactory;

    // 主キーカラムを指定
    protected $primaryKey = 'quize_no';

    // オートインクリメント無効化
    public $incrementing = false;
   
    // Laravel 6.0+以降なら主キーの型を指定
    protected $keyType = 'string';

    public function choices()
    {
        return $this->hasMany(Choice::class);
    }
}
