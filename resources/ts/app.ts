"strict"
import { itemLocalStorageToken, itemLocalStorageOrderId, itemLocalStorageItems, itemLocalStorageCategories } from './utils/localstorageVars';
import { body } from "./pages/body";
import { cart } from "./pages/cart";
import { header } from "./pages/header";
import { products } from "./pages/product";
import { productDetails } from "./pages/product-details";
import { cartSuccess } from './pages/cart-success';

export const baseUrl = "https://epservice.herokuapp.com/api/v1";
 
  
 window.loadItems = async (token:string,orderId:string) => {

    localStorage.setItem(itemLocalStorageToken,token);
    localStorage.setItem(itemLocalStorageOrderId,orderId);



    

    try {
        const response = await fetch(`${baseUrl}/Item/ShowByQrCode/${orderId}`,{
            method:'GET',
            headers: {
            'Content-Type': 'application/json' ,
             Accept: 'application/json',
             Authorization : `Bearer ${token}`,
            }
        }) 
         const items = await response.json()

        localStorage.setItem(itemLocalStorageItems,JSON.stringify(items.Data.Data))
 
    } catch (error) {
        console.log(error);
        
    }

 }

    window.loadCategories = async (token:string,orderId:string) => {
        try {

            const response = await fetch(`${baseUrl}/CategoryItem/ShowTree`,{
                method:'GET',
                headers: {
                'Content-Type': 'application/json' ,
                 Accept: 'application/json',
                 Authorization : `Bearer ${token}`,
                }
            }) 
             const categories = await response.json()
 

            localStorage.setItem(itemLocalStorageCategories,JSON.stringify(categories.Data.Data[0]))
            
             
            
        } catch (error) {
            console.log(error);
            
        }


    }

 



window.header = header
window.body = body
window.products = products
window.productDetails = productDetails
window.cart = cart
window.cartSuccess = cartSuccess
