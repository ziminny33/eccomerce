
@if (!$envs->isMobile)
    <div class="global-footer-container">
        <div class="global-footer-content">
            <button >
                @include('utils.icon-home')
                <span>Home</span>
            </button>
        </div>

        <div class="global-footer-content global-footer-content-cart">
            <button >
                @include('utils.icon-cart',[ 'fillSvg' => '#5A5A5A', 'sizeSvg' => '25px'])
                <div class="global-footer-total-items-cart"></div>
                <span>Carrinho</span>
            </button>
        </div>

        <div class="global-footer-content">
            <button >
                @include('utils.icon-user')
                <span>Perfil</span>
            </button>
        </div>
    </div>

    @push('script')
    
 

    @endpush

@endif