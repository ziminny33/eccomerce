@extends('layouts.app')

@section('title','Produtos')
@section('css')
    <link rel="stylesheet" type="text/css" href="/css/glider/glider.css">
@endsection

@section('body')

<div class="details-container">
    {{-- <div class="details-image-container" style="background-image: url({{ $item['Image'] }})">
      <button class="details-button-back" onclick="location.href = '/product'">
        <img src="/images/icon-back.png" alt="" class="details-icon-back">
      </button>
      
  </div>

  <h2 class="details-product-name"> {{ $item["Name"] }} </h2>
  <p class="details-product-amount"> {{ $item['Amount'] }} </p>
  <h4 class="details-product-description"> {{ $item['Description'] }} </h4>

  <div class="details-footer-bottoms">

      <button class="details-button-rounded-action details-button-rounded-action-rem">-</button>
      <span class="details-qtd">1</span>
      <button class="details-button-rounded-action details-button-rounded-action-add" >+</button>

      <button class="details-button-confirm">Adicionar</button>

  </div> --}}

</div>


 
@endsection

@push('script')
  <script type="text/javascript" defer>
    window.productDetails()
  </script>
@endpush



 
 