<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;

class DetailsProduct extends Controller
{
    static function execute($id) {
        $item = DetailsProduct::searchItem($id);
        return View('product.details',['item' => $item]);
    }

    static private function searchItem($id) {
        $strJsonFileItemShow = file_get_contents(__DIR__."/json/ItemShow.json");
        $items = json_decode($strJsonFileItemShow,true); 

        foreach ($items["Data"]["Data"] as $item) {
           
            if($id == $item['Id'] ) return $item;
        } 
        return null;
    }
}
