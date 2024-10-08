<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/join', [ChatController::class, 'join']);
Route::get('/chat-logs', [ChatController::class, 'getChatLogs']);
Route::post('/save-message', [ChatController::class, 'saveMessage']);