<?php

namespace App\Listeners;

use App\Events\EmployeeChanged;
use App\Events\ReportChanged;
use App\Events\VaccineChanged;

class FlushCacheListener
{
    public function handle(EmployeeChanged | VaccineChanged | ReportChanged $event)
    {
        // Cache::flush();
    }
}
