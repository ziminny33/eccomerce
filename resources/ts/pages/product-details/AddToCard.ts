import { CartItem } from './../../interfaces/Cartitem';
import { ItemShow } from './../../interfaces/ItemShow';
import { itemLocalstorageCartItems, itemLocalStorageItems } from "../../utils/localstorageVars";
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
 
                const items = JSON.parse(localStorage.getItem(itemLocalStorageItems)) as ItemShow[]
                const item = items.find( (i) => i.Id == id)
                 
                
                // If main page add 1 un
                const amount = this.controlAmountItem?.getAmount() ?? 1

                 const getitemLocalstorage = localStorage.getItem(itemLocalstorageCartItems) 

                 // Exists item(s) cart
                 if(getitemLocalstorage) {
                     const cart = JSON.parse(getitemLocalstorage) as CartItem[]
                
                     
                     // If exists selected item, add more quantity
                     const curerntCart = cart.find( i => i.item.Id == id)
                     if(curerntCart) {

                        const total = parseFloat(curerntCart.item.Amount) * (amount + curerntCart.amount )

                        const sumAmount = curerntCart.amount + amount
                        curerntCart.amount = sumAmount
                        curerntCart.total = total
                        
                        const removeCurrentItem = cart.filter( e => e.item.Id != id)

                        const newCart:CartItem[] = [
                            ...removeCurrentItem,
                              curerntCart
                        ]
                         
                        localStorage.setItem(itemLocalstorageCartItems,JSON.stringify(newCart))
                        return;
                     }

                     const total = parseFloat(item.Amount) * amount 
                     // If not exists is item in card, add
                     const newCart:CartItem[] = [
                         ...cart 
                        ,{
                        item,
                        amount,
                        total
                    }]
                    localStorage.setItem(itemLocalstorageCartItems,JSON.stringify(newCart))

                     
                    
                    return;
                 }

                 const total = parseFloat(item.Amount) * amount 
                 
                 // Not exists items
                 const cart:CartItem[] = [{
                    item,
                    amount,
                    total
                }]  
                  
                 
              localStorage.setItem(itemLocalstorageCartItems,JSON.stringify(cart))

            }
        } catch (error) {
            console.log(error);
            
        }
    }

 

}