<?php

namespace App\View\Composers;

use App\Utils\CheckIsDefaultNagivationModel;
use Illuminate\Contracts\View\View;


class CheckIsDefaultNagivationComposer {

    /**
     *  @param \App\Utils\CheckIsDefaultNagivationModel $checkDefaultNavigation
     *  @return void
     *  Dependency injection EnvsModel by Laravel
     */ 
    public function __construct(private CheckIsDefaultNagivationModel $checkDefaultNavigation)
    {}

    public function compose(View $view):void {
 
        $view->with('isDefaultNavigation',$this->checkDefaultNavigation->run());
    }
}