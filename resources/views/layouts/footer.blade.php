
@if (!$envs->isMobile)
    <div class="global-footer-container">
        <div class="global-footer-content">
            <button  onclick="window.location='{{ url("product") }}'" >
                @include('utils.icon-home',[ 'fillSvg' => $colorIcon->getColor('list-products'), 'sizeSvg' => '25px'])
                <span>Home</span>
            </button>
        </div>

        <div class="global-footer-content global-footer-content-cart">
            <button  onclick="window.location='{{ url("cart") }}'" >
                @include('utils.icon-cart',[ 'fillSvg' => $colorIcon->getColor('cart'), 'sizeSvg' => '25px'])
                <div class="global-footer-total-items-cart"></div>
                <span>Carrinho</span>
            </button>
        </div>

        <div class="global-footer-content">
            <button  onclick="window.location='{{ url("about") }}'" >
                @include('utils.icon-about',[ 'fillSvg' => $colorIcon->getColor('about'), 'sizeSvg' => '25px'])
                <span>Sobre</span>
            </button>
        </div>
    </div>

    @push('script')
    
 

    @endpush

@endif