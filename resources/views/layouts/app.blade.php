<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    <script  src="{{ mix('js/app.js') }}"></script>
    <script  src="{{mix('ts/product/app.js')}}" ></script>
    <script  src="{{mix('ts/header/app.js')}}" ></script>
    @stack('css')
 
    
   
    <title>@yield('title','Trem Digital')</title>
 
</head>
<body>

    <header>
        @yield('header')
    </header>

    <main id="main">
        @yield('body')  
    </main>

    <footer>
        @yield('footer') 
    </footer>

</body>

@stack('script')
    
 

</html>