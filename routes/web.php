<?php

use App\Http\Controllers\Product\ProductBaseController;
use Illuminate\Support\Facades\Route;
 

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

 
 

Route::prefix('products')->group(function () {
    Route::get('/list', [ProductBaseController::class,'index'])->name("list-products");
});

 