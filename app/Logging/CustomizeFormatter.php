<?php

namespace App\Logging;

use Monolog\Logger;
use Monolog\Formatter\LineFormatter;
use Monolog\Processor\IntrospectionProcessor;
use Illuminate\Support\Facades\Auth;
use Monolog\LogRecord;

class CustomizeFormatter
{
    public function __invoke($logger)
    {
        // $format = "%datetime% [%channel%.%level_name%] %extra.class%::%extra.function%(L.%extra.line%) %extra.username%(ID:%extra.userid%) %message%" . PHP_EOL;
        $format = "%datetime% [%channel%.%level_name%] %extra.class%::%extra.function% %extra.username%(UserID:%extra.userid%) %message%" . PHP_EOL;

        $dateFormat = "Y-m-d H:i:s";
        $lineFormatter = new LineFormatter($format, $dateFormat, true, true);

        $introspectionProcessor = new IntrospectionProcessor(Logger::DEBUG, ['Illuminate\\']);

        foreach ($logger->getHandlers() as $handler) {
            $handler->pushProcessor($introspectionProcessor);
            $handler->pushProcessor([$this, 'addUserFields']);
            $handler->setFormatter($lineFormatter);
        }
    }

    public function addUserFields(LogRecord $record): LogRecord
    {
        $user = Auth::user();
        $extra = $record->extra + [
            'userid' => $user->id ?? '-',
            'username' => $user ? $user->name : '未ログイン',
        ];
    
        // 新しい LogRecord を作成し、extra 情報を追加
        return $record->with(extra: $extra);
    }

}
