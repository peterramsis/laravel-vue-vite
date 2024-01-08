<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        @vite('resources/js/app.js')
    </head>
    <body class="antialiased">

        {{ app()->getLocale() }}
     <div id="app">
        <router-view />

     </div>
    </body>
</html>
