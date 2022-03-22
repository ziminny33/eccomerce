<?php

namespace App\Providers;

use App\View\Composers\EnvsComposer;
use Illuminate\Support\ServiceProvider;

class EnvsProvider extends ServiceProvider
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
        view()->composer("*",EnvsComposer::class);
    }
}
