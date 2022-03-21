@extends('layouts.app')

@section('title','Produtos')
@push('css')
    <link rel="stylesheet" type="text/css" href="/css/glider/glider.css">
@endpush

@section('body')
    {{dd($requestId)}}
    @section('header')
        @include('layouts.header.index')
    @endsection
    @include('utils.breadcrumbs')
    @include('layouts.product.categories')
    @include('layouts.product.sub-section-order')
    @include('layouts.product.card-container')
    @section('footer')
         @include('layouts.footer')
    @endsection
@endsection

@push('script')
    <script type="text/javascript" defer>
 
         window.fillVariables = {
            categories: @json($categories) ,
            items: @json($items) ,
            themeColor: @json($themeColor) ,
            isMobile: @json($isMobile) 
         }

         window.header()

        // arquivo ts/product/app.js
        window.loadGlider()
        window.products()

    </script>
@endpush



 
 