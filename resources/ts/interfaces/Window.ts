import { ItemShow } from "./ItemShow";
import { ShowTree } from "./ShowTree";

export {};

 interface Params {
    themeColor:string
    isMobile:boolean
    isDefaultNavigation:boolean
 }

declare global {
    interface Window {
        header: () => void
        body: () => void
        cart: () => void
        footer: () => void
        loadGlider: () => void
        products:() => void
        productDetails:() => void
        loadItems: (token:string,orderId:string) => void
        loadCategories: (token:string,orderId:string) => void
        cartSuccess: () => void
        fillVariables:Params
    }
}