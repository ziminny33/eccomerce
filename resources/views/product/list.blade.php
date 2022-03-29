@extends('layouts.app')

@section('title','Produtos')
@push('css')
    <link rel="stylesheet" type="text/css" href="/css/glider/glider.css">
@endpush

@section('header')
  @include('layouts.header.index')
@endsection

@section('body')
    @include('utils.breadcrumbs')
    @include('layouts.product.categories')
    @include('layouts.product.sub-section-order')
    @include('layouts.product.card-container')
@endsection
 

 

@push('script')
    <script type="text/javascript" defer>
 
 
    const orderId = @json($orderId);
    const token = @json($token);
    const themeColor = @json($themeColor);
    const isMobile = @json($isMobile);

    localStorage.setItem('@trem.digital.eccomerce:orderId',orderId);
    localStorage.setItem('@trem.digital.eccomerce:token',token);
    localStorage.setItem('@trem.digital.eccomerce:themeColor',themeColor);
    localStorage.setItem('@trem.digital.eccomerce:isMobile',isMobile);

   
  ( async () => {
    await window.loadItems() 
    await window.loadCategories()
 
       
    window.header()

    // arquivo ts/product/app.js
    window.loadGlider()
    window.products()
 
  })();
 

    </script>
@endpush



 
 