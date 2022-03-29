<?php

namespace App\Http\Controllers;

use App\Utils\EnvsModel;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    
    public function test() {

 

        return View('product.list',[
          'teste' => 'Issso é um teste'
        ]);
 
    }
}
