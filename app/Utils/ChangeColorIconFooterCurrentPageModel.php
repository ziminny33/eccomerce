<?php

namespace App\Utils;

use Illuminate\Support\Facades\Route;

class ChangeColorIconFooterCurrentPageModel  {

 

 

    public function getColor($route)  {

 

        $defaultColor = "#000";
        $selectedColor = "#5A5A5A";



        $color = Route::currentRouteName() == $route ? $defaultColor : $selectedColor;
 
        return $color;
    }

}
