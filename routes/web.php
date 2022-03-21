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

 
 

Route::prefix('product')->group(function () {
    Route::get('/', [ProductBaseController::class,'index'])->name("list-products");
    Route::get('/{id}', [ProductBaseController::class,'show'])->name("details-product");
});

 