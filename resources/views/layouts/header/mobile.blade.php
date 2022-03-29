<div class="global-header-left">
   
</div>

<h2 class="global-header-center-text">Produtos</h2>

<div class="global-header-content global-header-content-cart">
    <button  onclick="window.location='{{ url("cart") }}'" >
        @include('utils.icon-cart',[ 'fillSvg' => '#FFAA00'])
        <div class="global-header-total-items-cart"></div>
    </button>
 </div>
