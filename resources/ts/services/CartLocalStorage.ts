import { CartItem } from "../interfaces/Cartitem";
import { ItemShow } from "../interfaces/ItemShow";
import { itemLocalstorage } from "../utils/localstorageVars";
import { ControlAmountItem } from "./ControlAmountItem";

export class CartLocalStorage {

     

    private cartItems:CartItem[] = [] as CartItem[]

    constructor(
        public controlAmountItem:ControlAmountItem
    ) {
        this.controlAmountItem.execute()
        const storage = localStorage.getItem(itemLocalstorage)

        if(storage) {
            this.cartItems = JSON.parse(storage) as CartItem[] 
        }

    }

    public getItems():CartItem[] {
        return this.cartItems
    }

    public getTotal():number {
        return this.cartItems.length
    }

    public getTotalPrice(cartItem:CartItem) {
        return cartItem.total
    }

    public getAmount(cartItem:CartItem) {
        return cartItem.amount
    }

    private setLocalstorageItem(cartItems:CartItem[]) {
        localStorage.setItem(itemLocalstorage,JSON.stringify(cartItems))
    }

    public async addItem(id:number) {

        try {
             
            if(typeof id == "number") {
                const response = await fetch(`/api/Item/Show/${id}`)
                const item = await response.json() as ItemShow
               
                // If main page add 1 un
                const amount = this.controlAmountItem?.getAmount() ?? 1
 
                 const cart = this.getItems()

                 // Exists item(s) cart
                 if(cart) {
  
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
                         
                        this.setLocalstorageItem(newCart)
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
                    this.setLocalstorageItem(newCart)

                     
                    
                    return;
                 }

                 const total = parseFloat(item.Amount) * amount 
                 
                 // Not exists items
                 const newCart:CartItem[] = [{
                    item,
                    amount,
                    total
                }]  
                  
                 
              localStorage.setItem(itemLocalstorage,JSON.stringify(newCart))

            }
        } catch (error) {
            console.log(error);
            
        }

    }

}