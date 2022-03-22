<?php

namespace App\Http\Controllers\Product;
use App\Http\Controllers\Product\ListProductController;
 

class ProductBaseController 
{
    function index() {
        return ListProductController::execute();
    }

    function show($id) {
        return DetailsProduct::execute($id);
    }
}
