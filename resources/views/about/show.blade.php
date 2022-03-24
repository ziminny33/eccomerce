@extends('layouts.app')

@section('title','Produtos')
@push('css')
    <link rel="stylesheet" type="text/css" href="/css/glider/glider.css">
@endpush

@section('body')

@endsection

  
@section('header')
  @include('layouts.header.index')
@endsection

@section('footer')
  @include('layouts.footer')
@endsection

@push('script')
    <script type="text/javascript" defer>

( async () => {
 
    await window.loadCategories()
    window.header()
    window.footer()
  })();

    </script>
@endpush



 
 