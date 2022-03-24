<button class="global-header-left">
 
</button>

<h2 class="global-header-center-text">Produtos</h2>

<button class="global-header-button-right" onclick="window.location='{{ url("cart") }}'" >
    @include('utils.icon-cart',[ 'themeColor' =>  $envs->themeColor ])
</button>
