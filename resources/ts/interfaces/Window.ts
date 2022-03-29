import { ItemShow } from "./ItemShow";
import { ShowTree } from "./ShowTree";

export {};

 interface Params {
    categories:ShowTree, 
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
        loadItems: () => void
        loadCategories: () => void
        fillVariables:Params
    }
}