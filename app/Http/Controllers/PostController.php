<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posts\PostStoreRequest;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Post::orderBy("id" , "desc")->paginate(1);
        return response()->json($data,200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request)
    {
         $data = [
            "title" => $request->title,
            "body" => $request->body
         ];

         $post = Post::create($data);

         return response()->json(["status" => true , "post" => $post],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post = Post::find($request->id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return response()->json(["status" =>  true],200);
    }

    /**
     * Remove the specified resource from storage.
     */
public function destroy($id)
    {
       $post = Post::find($id);
       $post->delete();

       return response()->json(["status" =>  true],200);
    }
}
