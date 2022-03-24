import { CartItem } from './../../interfaces/Cartitem';
import { ItemShow } from './../../interfaces/ItemShow';
import { itemLocalstorage } from "../../utils/localstorageVars";
import { BaseClass } from "../BaseClass";
import { ControlAmountItem } from "./ControlAmountItem";
import { getIdUrl } from '../../utils/getIdUrl';

export class AddToCard extends BaseClass {

    private controlAmountItem:ControlAmountItem;
    private confirm:HTMLButtonElement;
  

    constructor(controlAmountItem?:ControlAmountItem) {
        super()
        this.controlAmountItem = controlAmountItem
        this.confirm = this.$('.details-button-confirm')
        
    }

    public execute() {
        this.controlAmountItem.execute()
        this.confirm.addEventListener("click", async () => {  
            await this.additem(getIdUrl())
            location.href = "/product"
            
        })
    }



    public async additem(id:number) {
          
        try {
             
            if(typeof id == "number") {
                const response = await fetch(`/api/Item/Show/${id}`)
                const item = await response.json() as ItemShow
               
                // If main page add 1 un
                const amount = this.controlAmountItem?.getAmount() ?? 1

                 const getitemLocalstorage = localStorage.getItem(itemLocalstorage) 

                 // Exists item(s) cart
                 if(getitemLocalstorage) {
                     const cart = JSON.parse(getitemLocalstorage) as CartItem[]
                     console.log(cart);
                     
                     // If exists selected item, add more quantity
                     const curerntCart = cart.find( i => i.item.Id == id)
                     if(curerntCart) {
                        const sumAmount = curerntCart.amount + amount
                        curerntCart.amount = sumAmount
                        
                        const removeCurrentItem = cart.filter( e => e.item.Id != id)

                        const newCart:CartItem[] = [
                            ...removeCurrentItem,
                              curerntCart
                        ]
                         
                        localStorage.setItem(itemLocalstorage,JSON.stringify(newCart))
                        return;
                     }

                     // If not exists is item in card, add
                     const newCart:CartItem[] = [
                         ...cart 
                        ,{
                        item,
                        amount
                    }]
                    localStorage.setItem(itemLocalstorage,JSON.stringify(newCart))

                     
                    
                    return;
                 }
                 
                 // Not exists items
                 const cart:CartItem[] = [{
                    item,
                    amount
                }]  
                  
                 
              localStorage.setItem(itemLocalstorage,JSON.stringify(cart))

            }
        } catch (error) {
            console.log(error);
            
        }
    }

 

}