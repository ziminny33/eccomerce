<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    {{-- <script src="{{ mix('js/app.js') }}"></script> --}}
    <script src="{{ asset('ts/app.js') }}" ></script>
 
    @stack('css')
 
    
   
    <title>@yield('title','Trem Digital')</title>
 
</head>
<body>
    @if ($isDefaultNavigation->allow)
        <header>
            @yield('header')
        </header>
    @endif

    <main id="main">
        @yield('body')  
    </main>

    @if ($isDefaultNavigation->allow)
        <footer>
            @yield('footer') 
        </footer>
    @endif

</body>

<script type="text/javascript" defer>

    window.fillVariables = {
        isDefaultNavigation:@json($isDefaultNavigation->allow)
    }

       window.body()

</script>
 
@stack('script')
    
 

</html>