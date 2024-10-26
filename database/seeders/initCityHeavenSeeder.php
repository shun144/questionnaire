<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class initCityHeavenSeeder extends Seeder
{


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $access_key = "4cklsVa5Gn4wBSVxRJSwHqYGUyChmFSo";
        $shop_id = "1500000311";

        DB::table('city_heavens')->insert([
            'access_key' => Crypt::encryptString($access_key),
            'shop_id' => Crypt::encryptString($shop_id),
            'masking_access_key' => $this->maskString($access_key,2),
            'masking_shop_id' => $this->maskString($shop_id, 2),
            'user_id' => '1',
        ]);
    }


    private function maskString($string, $keepLength=3):string {
        return "xxxxxx" . substr($string, -1 * ($keepLength));
    }

    // private function maskString($string, $keepLength=3):string {

    //     $replaceChar = '.';

    //     // 文字列の長さを取得
    //     $strLength = strlen($string);

    //     // 残す部分の長さが文字列の長さを超える場合、全体をそのまま返す
    //     if ($keepLength >= $strLength) {
    //         return $string;
    //     }

    //     // 置換する部分の長さ
    //     $replaceLength = $strLength - $keepLength;

    //     // 置換する文字列を生成
    //     $replacement = str_repeat($replaceChar, $replaceLength);

    //     // 残す部分の文字列（末尾から指定した文字数分）
    //     $remaining = substr($string, -$keepLength);

    //     // 結果の文字列を返す
    //     return $replacement . $remaining;
    // }
}
