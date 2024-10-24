<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileDownloadController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\VaccineController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/employees', EmployeeController::class)->middleware('auth:sanctum');

Route::apiResource('/vaccines', VaccineController::class)->middleware('auth:sanctum');

Route::apiResource('/reports', ReportController::class)->middleware('auth:sanctum');

Route::get('/intended-url', [AuthController::class, 'getIntendedUrl'])->middleware('auth:sanctum');

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
})->middleware('auth:sanctum');

Route::get('/download', [FileDownloadController::class, 'download'])
    ->name('download.file')
    ->middleware(['auth', 'signed']);

Route::get('/stats', [StatsController::class, 'index']);
Route::get('/stats/vaccination-report', [StatsController::class, 'vaccinationReport']);
Route::get('/stats/unvaccinated-report', [StatsController::class, 'unvaccinatedReport']);
