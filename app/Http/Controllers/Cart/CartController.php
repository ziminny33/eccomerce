<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index() {
        return View("cart.show");
    }

    public function success() {
        return View("cart.success");
    }
}
