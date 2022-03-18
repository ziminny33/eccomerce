<script src="/js/glider/glider.min.js">
</script>

<div class="glider-wrapper">
    <div class="glider-contain product-glider-container" id="product-glider-container">
        <div class="product-glider-content">
            @foreach ($categories['ItemCategories'] as $item)
                <button data-id="{{$item['Id']}}" class="product-item" data-reference-id="reference{{$item['Id']}}">
                    {{ $item['Name'] }}
                </button>
            @endforeach
        </div>
    
        {{-- <button aria-label="Previous" class="glider-prev">«</button>
        <button aria-label="Next" class="glider-next">»</button> --}}
    </div>
</div>

 

  <script src="/js/products/card.js">
  </script>