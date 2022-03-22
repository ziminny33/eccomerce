@extends('layouts.app')

@section('title','Produtos')
@push('css')
    <link rel="stylesheet" type="text/css" href="/css/glider/glider.css">
@endpush

@section('body')
  
    @section('header')
        @include('layouts.header.index')
    @endsection
    @include('utils.breadcrumbs')
    @include('layouts.product.categories')
    @include('layouts.product.sub-section-order')
    @include('layouts.product.card-container')
    @section('footer')
         @include('layouts.footer')
    @endsection
@endsection

@push('script')
    <script type="text/javascript" defer>

   

    ( async () => {
        try {

            const loadItems = async () => {
                const response = await fetch("/api/Item/Show") 
                return await response.json()
            } 

            const loadCategories = async () => {
                const response = await fetch("/api/CategoryItem/ShowTree") 
                return await response.json()
            }

            const [ items , categories ] =  await Promise.all([ loadItems(), loadCategories()  ])
 

            window.fillVariables = {
             ...window.fillVariables,
            categories: categories ,
            items: items ,
            themeColor: @json($envs->themeColor) ,
            isMobile: @json($envs->isMobile) 
         }

         window.header()

        // arquivo ts/product/app.js
        window.loadGlider()
        window.products()
        window.footer()
        } catch (error) {
            console.log(error);
        }
    })();

    </script>
@endpush



 
 