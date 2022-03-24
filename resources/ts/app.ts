import { body } from "./pages/body";
import { cart } from "./pages/cart";
import { footer } from "./pages/footer";
import { header } from "./pages/header";
import { products } from "./pages/product";
import { productDetails } from "./pages/product-details";


 window.loadItems = async () => {
    const response = await fetch("/api/Item/Show") 
     const items =  await response.json()

    window.fillVariables = {
        ...window.fillVariables,
       items ,
    }

 }
 

    window.loadCategories = async () => {
        const response = await fetch("/api/CategoryItem/ShowTree") 
        const categories =  await response.json()

        window.fillVariables = {
            ...window.fillVariables,
            categories ,
        }
    }

     




 

 

window.header = header
window.body = body
window.products = products
window.productDetails = productDetails
window.footer = footer
window.cart = cart
