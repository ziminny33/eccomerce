<?php

namespace App\Http\Controllers\Product;
use App\Http\Controllers\Product\ListProducts;

class ProductBaseController 
{
    function index() {
        return ListProducts::execute();
    }
}
