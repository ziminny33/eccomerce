<?php

namespace App\Providers;

use App\View\Composers\CheckIsDefaultNagivationComposer;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class CheckIsDefaultNagivationProvider extends ServiceProvider
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
        view()->composer("*",CheckIsDefaultNagivationComposer::class);
    }
}
