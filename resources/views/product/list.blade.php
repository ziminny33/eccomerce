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

    <div class="global-loader-container">
      <div class="global-loader-spinner"></div>
    </div>
@endsection
 

 

@push('script')
    <script type="text/javascript" defer>
  
 
   
  ( async () => {

    localStorage.setItem('@trem.digital.eccomerce:themeColor',@json($themeColor));
    localStorage.setItem('@trem.digital.eccomerce:isMobile',@json($isMobile));

    const loader = document.querySelector(".global-loader-container")
    
    if(localStorage.getItem('@trem.digital.eccomerce:orderId') !== @json($orderId)) {
       const sendToServer = localStorage.getItem('@trem.digital.eccomerce:sendeToServer')
       if(sendToServer) {
          localStorage.removeItem('@trem.digital.eccomerce:sendeToServer')
       }
    }

    await Promise.all(
      [ 
       window.loadItems(@json($token),@json($orderId)) , 
       window.loadCategories(@json($token),@json($orderId))
      ])

    loader.style.display = "none"
       
 
   window.header()

  // arquivo ts/product/app.js
   window.loadGlider()
   window.products()
 
 
  })();
 

    </script>
@endpush



 
 