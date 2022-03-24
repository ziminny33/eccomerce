<?php

namespace App\View\Composers;

use App\Utils\ChangeColorIconFooterCurrentPageModel;
use Illuminate\Contracts\View\View;


class ChangeColorIconFooterCurrentPageCompose {

    /**
     *  @param \App\Utils\CheckIsDefaultNagivationModel $checkDefaultNavigation
     *  @return void
     *  Dependency injection EnvsModel by Laravel
     */ 
    public function __construct(private ChangeColorIconFooterCurrentPageModel $changeColorIconFooterCurrentPageModel)
    {}

    public function compose(View $view):void {
 
        $view->with('colorIcon',$this->changeColorIconFooterCurrentPageModel);
    }
}