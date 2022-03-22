import { ItemShow } from '../../interfaces/ItemShow';
export default class ClickToDetailsProduct {

    /**
     *  @param element 
     *  @param item 
     *  @return void
     *  Redirect user to details product
     */
    public static execute(element:HTMLElement,item:ItemShow) {
        element.addEventListener("click", (e) => {
            e.preventDefault()
            window.location.href = `/product/${item.Id}`
        } ) 
    }
}