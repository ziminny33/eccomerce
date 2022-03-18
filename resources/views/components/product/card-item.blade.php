<div class="product-cart-item" style='border-top-color:{{ $themeColor }}'>
     
    <div class="product-cart-image">
        <img src="{{ $image }}" alt="" srcset="">
    </div>
    <div class="product-cart-name">
        {{ $name }}
    </div>
    <div class="product-cart-description-small">
        {{ $descriptionSmall }}
    </div>
    <div class="product-cart-price">
        {{ $price }}
    </div>
    <p class="product-cart-delivered">
        <span>Entregue por:</span> {{ $delivered }}
    </p>
    <div class="product-cart-add-item" style="background-color: {{ $themeColor }}">
        @include('utils.icon-cart',[ 'themeColor' => '#fff'])
    </div>
</div>

