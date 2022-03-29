import { itemLocalStorageToken, itemLocalStorageOrderId, itemLocalStorageItems } from './utils/localstorageVars';
import { body } from "./pages/body";
import { cart } from "./pages/cart";
import { header } from "./pages/header";
import { products } from "./pages/product";
import { productDetails } from "./pages/product-details";

export const baseUrl = "https://epservice.herokuapp.com/api/v1";
const token = localStorage.getItem(itemLocalStorageToken)
const orderId = localStorage.getItem(itemLocalStorageOrderId)
  
 window.loadItems = async () => {



    try {
        const response = await fetch(`${baseUrl}/Item/ShowByQrCode/${orderId}`,{
            method:'GET',
            headers: {
            'Content-Type': 'application/json' ,
             Accept: 'application/json',
             Authorization : `Bearer ${token}`,
            }
        }) 
         const items =  await response.json()
        console.log(items.Data.Data);

        window.fillVariables = {
            ...window.fillVariables,
            // items:items.Data.Data || [],
        }

        localStorage.setItem(itemLocalStorageItems,JSON.stringify(items.Data.Data))
 
    } catch (error) {
        console.log(error);
        
    }
        


 }

    window.loadCategories = async () => {
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
 

             window.fillVariables = {
                ...window.fillVariables,
                categories:categories.Data.Data[0] ,
            }
             
            
        } catch (error) {
            console.log(error);
            
        }


    }

 



window.header = header
window.body = body
window.products = products
window.productDetails = productDetails
window.cart = cart
