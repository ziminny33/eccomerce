<?php

use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Js;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('CategoryItem')->group(function () {
    
    Route::get('ShowTree', function () {
        $strJsonFile = file_get_contents(__DIR__."/json/ShowTree.json");
        $array = json_decode($strJsonFile,true); 
        return response()->json($array);
    });
});

Route::prefix('Item')->group(function () {
     Route::get('ShowByCategory/{id}', function ($id) {
        $strJsonFile = file_get_contents(__DIR__."/json/ItemShowByCategory.json");
        $array = json_decode($strJsonFile,true); 
        return response()->json($array);
     });

     Route::get('Show', function () {
         $strJsonFile = file_get_contents(__DIR__."/json/ItemShow.json");
         $array = json_decode($strJsonFile,true); 
         return response()->json($array['Data']['Data']);
   });



   Route::get('Show/{id}', function ($id) {
     function searchItem($id) {
        $strJsonFileItemShow = file_get_contents(__DIR__."/json/ItemShow.json");
        $items = json_decode($strJsonFileItemShow,true); 

        foreach ($items["Data"]["Data"] as $item) {
           
            if($id == $item['Id'] ) return $item;
        } 
        return null;
    }

    return response()->json(searchItem($id));

   });
});

Route::get('test', [ItemController::class,'test']);
