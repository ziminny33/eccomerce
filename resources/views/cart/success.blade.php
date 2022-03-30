@extends('layouts.app')

@section('title','Produtos')
@push('css')
    <link rel="stylesheet" type="text/css" href="/css/glider/glider.css">
@endpush

@section('body')

<div class="cart-success-container">

    <img src="/images/cart-success.png" alt="" class="cart-success-image"/>

    <h2 class="cart-success-text1">
        Pedido finalizado com sucesso
    </h2>

    <p class="cart-success-text2">
        Para acompanhar seu pedido você pode baixar nosso aplicativo disponível para iOS ou Android clicando no link abaixo
    </p>

    <div class="cart-success-payments-redirect">
        <img src="/images/ios-redirect.png" alt="" class="cart-success-image-plataform"/>
        <img src="/images/android-redirect.png" alt="" class="cart-success-image-plataform"/>
    </div>

    <button class="cart-success-button cart-success-button-payment">
        Efetuar pagamento
    </button>

    <button class="cart-success-button cart-success-button-back-to-home">
        Voltar a tela inicial
    </button>




</div>

@endsection

  
 
 

@push('script')
    <script type="text/javascript" defer>
        window.cartSuccess()
    </script>
@endpush



 
 