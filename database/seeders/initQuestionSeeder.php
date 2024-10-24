<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class initQuestionSeeder extends Seeder
{
    public function run(): void
    {
        $params = [];

        for($i = 0; $i < 30; $i++)[
            array_push($params,
            [
                'id'=>'b4snjf4un8'. $i,
                'position'=>
                    [
                        'x'=> 0 + 150 * $i,
                        'y'=>0 + 1 *$i
                    ],
                'type'=>'qNode',
                'dragHandle'=>'.dhandle',
                'measured'=>
                    [
                        'width'=>384,
                        'height'=>678
                    ],
                'selected'=>true,
                'dragging'=>false,
                'data'=>[
                    'topic'=>'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    'choices'=>[
                        [
                            'id'=>'9gmafs0g4ng'. $i,
                            'content'=>'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            'salePoints'=>[
                                ['value'=>'01','label'=>'ルックス抜群','no'=>'01'],
                                ['value'=>'02','label'=>'スタイル抜群','no'=>'02'],
                                ['value'=>'03','label'=>'サービス抜群','no'=>'03'],
                            ]
                        ],
                        [
                            'id'=>'sfv43srfd48'. $i,
                            'content'=>'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            'salePoints'=>[
                                ['value'=>'01','label'=>'ルックス抜群','no'=>'01'],
                                ['value'=>'02','label'=>'スタイル抜群','no'=>'02'],
                                ['value'=>'03','label'=>'サービス抜群','no'=>'03'],
                            ]
                        ],
                        [
                            'id'=>'5mvsqt8b0n'. $i,
                            'content'=>'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            'salePoints'=>[
                                ['value'=>'01','label'=>'ルックス抜群','no'=>'01'],
                                ['value'=>'02','label'=>'スタイル抜群','no'=>'02'],
                                ['value'=>'03','label'=>'サービス抜群','no'=>'03'],
                            ]
                        ],
                        [
                            'id'=>'8q3cu4ce95o'. $i,
                            'content'=>'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            'salePoints'=>[
                                ['value'=>'01','label'=>'ルックス抜群','no'=>'01'],
                                ['value'=>'02','label'=>'スタイル抜群','no'=>'02'],
                                ['value'=>'03','label'=>'サービス抜群','no'=>'03'],
                            ]
                        ],
                        [
                            'id'=>'evkr4ed11eg'. $i,
                            'content'=>'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            'salePoints'=>[
                                ['value'=>'01','label'=>'ルックス抜群','no'=>'01'],
                                ['value'=>'02','label'=>'スタイル抜群','no'=>'02'],
                                ['value'=>'03','label'=>'サービス抜群','no'=>'03'],
                            ]
                        ]
                    ]
                ],
            ])
        ];

        DB::table('questions')->insert([
            [
                'flow_id' => 1,
                'node_datas' => json_encode($params)
            ]
        ]);

    }
}
