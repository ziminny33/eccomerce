<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    @section('css')
        
    @show
    <script src="/js/app.js"></script>
    <title>@yield('title','Trem Digital')</title>
 
</head>
<body>
    <header>
        @include('layouts.header',[ 'themeColor' =>'#FFAA00'])
    </header>
    <main>
        @section('body')
        @show
    </main>
    <footer>
        @include('layouts.footer')
    </footer>
</body>

@section('script')
    
@show
</html>