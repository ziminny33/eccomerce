<?php

namespace App\Utils;

use Illuminate\Support\Facades\Route;

class CheckIsDefaultNagivationModel implements ContractComposer {

 

    /**
     *  @var $allow
     *  If true show header and footer
     */
    public bool $allow;

    public function run():CheckIsDefaultNagivationModel  {

        $allowRoutes = [
            'list-products',
 
        ];

        $routename = Route::currentRouteName();
       
        $this->allow = in_array($routename,$allowRoutes);

        return $this;
    }

}
