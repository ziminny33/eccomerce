<?php

namespace App\View\Composers;

use App\Utils\EnvsModel;
use Illuminate\Contracts\View\View;


class EnvsComposer {

    /**
     *  @param \App\Utils\EnvsModel $envsModel
     *  @return void
     *  Dependency injection EnvsModel by Laravel
     */ 
    public function __construct(private EnvsModel $envsModel)
    {}

    public function compose(View $view):void {
 
        $view->with('envs',$this->envsModel->run());
    }
}