<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource("posts" , App\Http\Controllers\PostController::class);


Route::post("register", [App\Http\Controllers\UserAuthController::class, "register"]);
Route::post("login", [App\Http\Controllers\UserAuthController::class, "login"]);

Route::post("switchLanguage", [App\Http\Controllers\LanguageController::class, "switchLanguage"]);

Route::get("getLan", [App\Http\Controllers\LanguageController::class, "getLanguage"]);
