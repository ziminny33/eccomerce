<?php

namespace App\Providers;

use App\View\Composers\ChangeColorIconFooterCurrentPageCompose;
use Illuminate\Support\ServiceProvider;

class ChangeColorIconFooterCurrentPageProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer("*",ChangeColorIconFooterCurrentPageCompose::class);
    }
}
