<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function switchLanguage(Request $request){
        $language = $request->get("language");

        session(["language" => $language]);

       return response()->json(["success" => true , "language" => $language ,app()->getLocale()]);
    }

    public function getLanguage(){
        dd(app()->getLocale());
    }
}
