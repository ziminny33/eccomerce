<div class="global-header-left-container">
   <div class="global-header-logo">
      <img  class="global-header-logo-image" src="/images/logo.png" alt="" srcset="">
   </div>
  
  <h2 class="global-header-company-name"> </h2>
</div>

<div class="global-header-content global-header-content-cart">
   <button  onclick="window.location='{{ url("cart") }}'" >
       @include('utils.icon-cart',[ 'fillSvg' => $colorIcon->getColor('cart'), 'sizeSvg' => '20px'])
       <div class="global-header-total-items-cart"></div>
   </button>
</div>
 
 
