import { ItemShow } from "./ItemShow";
import { ShowTree } from "./ShowTree";

export {};

 interface Params {
    categories:ShowTree, 
    items:ItemShow[],
    themeColor:string
    isMobile:boolean
 }

declare global {
    interface Window {
        header: () => void
        loadGlider: () => void
        products:() => void
        fillVariables:Params
    }
}