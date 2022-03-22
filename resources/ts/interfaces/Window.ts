import { ItemShow } from "./ItemShow";
import { ShowTree } from "./ShowTree";

export {};

 interface Params {
    categories:ShowTree, 
    items:ItemShow[],
    themeColor:string
    isMobile:boolean
    isDefaultNavigation:boolean
 }

declare global {
    interface Window {
        header: () => void
        body: () => void
        footer: () => void
        loadGlider: () => void
        products:() => void
        productDetails:() => void
        fillVariables:Params
    }
}