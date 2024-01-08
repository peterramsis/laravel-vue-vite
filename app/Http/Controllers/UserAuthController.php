<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterStoreRequest;
use Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
class UserAuthController extends Controller
{
    public function register(RegisterStoreRequest $request){
        $user = User::create([
            "name"       => $request->name,
            "email"      => $request->email,
            "password"   => Hash::make($request->password),
        ]);
        return response()->json([ "message" => "Register created"],200);
    }

    public function login(LoginRequest $request){
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
        return response()->json([
            'token' => $token,
            "message" => "Login successful",
            "success" => true
    ] ,200);
    }
}
