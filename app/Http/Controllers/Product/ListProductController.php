<?php

namespace App\Http\Controllers\Product;
use App\Http\Controllers\Controller;
 
class ListProductController extends Controller
{
  
    /**
     *  @return Factory 
     *  [ items , categories , themeColor ]
     */
    
    static function execute()  {
       $orderId = 'eyJpdiI6I2GBplgj$774O12Q$9ezJmpaFdkJebI4xGjJImdiMIJz9xdalnsLy6zbJF';
       $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2MDdjMzM0NGQ0MWYzZDhmODNjMGEyMTM0ZDlhYzBiMTk1N2MzODM5NjcwY2I2NDAwYWY0OTdjMDVmYmIxODY0MTJlODI5NTY2ZjQxZGE1In0.eyJhdWQiOiIyIiwianRpIjoiZjYwN2MzMzQ0ZDQxZjNkOGY4M2MwYTIxMzRkOWFjMGIxOTU3YzM4Mzk2NzBjYjY0MDBhZjQ5N2MwNWZiYjE4NjQxMmU4Mjk1NjZmNDFkYTUiLCJpYXQiOjE2NDg0NzU3MjAsIm5iZiI6MTY0ODQ3NTcyMCwiZXhwIjoxNjUxMDY3NzIwLCJzdWIiOiI0NjEzIiwic2NvcGVzIjpbXX0.D6j8lLZ-4Z0FODzg1kGZMwr2LUpL5gBk0neDFkJ1OYBIHi3rLnuWiX6AbikRENnu6v7VwtCW9dSgCW6vKmq4e08Un1AtEmOavn9QfzjHp8a0xIgmnaVumOsPR1iR2fkc5CTjGP4GDT_T6OH0DGVb7DHUK38wkAiJ3FoNE9C_g7Q4pEvl8FmdAhosXs4LLx-KmbLWpDKZ4J1Pb7pSiy71Bn6kSySU50jxzY93DiYdi7p0cyYfk_04Nflui6gr5ldrAEIiK-wYQ3psNnezDNl0iKuzJM7_MnujvQ1CVpwHJhvO2TlHsND-F1HsLlc84JNJIEPkbL2RtcnYFTlB5SfYEGOr0ryM9WxQgGLxGoSXfV7-zSFtqXgl4UaST9XW2fCNIUHkj08ar51DPHzxApTQXbax2UAAm68RrevExa9PbrcFUcl3bOYnnlwufx8EFA3c6gwcBr0BtTUH5x9nfGJEkVphCbQL5bM5kT16mxvJN3ReQI1tF7fJcJJ-LhH3QDrTDBjAHeEch5mMe4KcZpuVs4sPyziLz4kpiV-Azbes2XhYQE3YppaKGv3docgcp6PKl4Nxo08T1EWO74i6FzS7JKW4BrS1rT5x4-xmcTz6KRIaDCwYu372ZUycOT5A4rEsLRGZZWpCoX2qvcgEn80U6Rrp3sDUF4gtUPCixEHe748";
        


        return View('product.list',[
            'orderId' => $orderId,
            'token' => $token,
            'themeColor' => 'rgb(255, 170, 0)',
            'isMobile' => false
        ]);
    }
}
