<?php

namespace App\Http\Controllers\Product;
use App\Http\Controllers\Controller;
 
class ListProductController extends Controller
{
  
    /**
     *  @return Factory 
     *  [ items , categories , themeColor ]
     */
    
    static function execute()  {

      $strJsonFileItemShow = file_get_contents(__DIR__."/json/ItemShow.json");
      $items = json_decode($strJsonFileItemShow,true); 

      $strJsonFileShowTree = file_get_contents(__DIR__."/json/ShowTree.json");
      $categories = json_decode($strJsonFileShowTree,true); 
 
        
        return View('product.list');
    }
}
