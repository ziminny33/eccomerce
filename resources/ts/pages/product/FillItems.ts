import { ItemShow } from "../../interfaces/ItemShow";
import { ShowTree } from "../../interfaces/ShowTree";
import { formatPrice } from "../../utils/formatPrice";
import { limitLetters } from "../../utils/limitLetters";
import { itemLocalStorageCategories } from "../../utils/localstorageVars";
import { BaseClass } from "../BaseClass";
import { AmountItemsCard } from "../header/AmountItemsCard";
 
import { AddToCard } from "../product-details/AddToCard";
import ClickToDetailsProduct from "./ClickToDetailsProduct";

export default class FillItems extends BaseClass {

      /**
       *  @var container
       *  Main container wrapper content
       */
      private container:HTMLButtonElement; 
      
      /**
       *  @var themeColor
       *  Theme application 
       */
      private themeColor:string;

      /**
       *  @var showTree
       *  Current item
       */

      private addToCard:AddToCard;

      private wrapper:HTMLDivElement  

      private content:HTMLDivElement

      private imageContainer:HTMLDivElement

      private innerImage:HTMLImageElement

      private name:HTMLDivElement

      private description:HTMLDivElement

      private price:HTMLDivElement

      private delivered:HTMLDivElement

      private cartAbsoluteRight:HTMLButtonElement

      private innerImageCart:HTMLImageElement


      private amountItemsCard:AmountItemsCard
      

        constructor() {
            super()
  
            this.themeColor = window.fillVariables.themeColor;
            this.container = this.$(".product-container")
            this.addToCard = new AddToCard()
            this.amountItemsCard = new AmountItemsCard()
       }

       public createElements():FillItems {

          this.wrapper = document.createElement("div")
          this.content = document.createElement("div")
          this.imageContainer = document.createElement("div")
          this.innerImage = document.createElement("img")
          this.name = document.createElement("div")
          this.description = document.createElement("div")
          this.price = document.createElement("div")
          this.delivered = document.createElement("div")
          this.cartAbsoluteRight = document.createElement("button")
          this.innerImageCart = document.createElement("img")

          return this
       }

       public addClass():FillItems {
          this.imageContainer.classList.add('product-cart-image')
          this.name.classList.add('product-cart-name')
          this.description.classList.add('product-cart-description-small')
          this.price.classList.add('product-cart-price')
          this.delivered.classList.add('product-cart-delivered')
          this.cartAbsoluteRight.classList.add('product-cart-add-item')
          
          return this
       }

      
    /** 
     *  @param item 
     *  @return void
     *  Fill all items in screen
     */
    public make(item:ItemShow) {
     
      
      
      this.wrapper.classList.add('product-cart-item-wrapper')
      this.wrapper.style.borderTopColor = this.themeColor
           

             
      this.content.classList.add('product-cart-item')
            
            this.wrapper.appendChild(this.content)
        
            ClickToDetailsProduct.execute(this.content,item);

             
            
 
            this.innerImage.setAttribute("src",item.Image || '/images/no-image.png')
            this.imageContainer.appendChild(this.innerImage)
            this.content.appendChild(this.imageContainer)

           
            
            this.name.textContent = item.Name
            this.content.appendChild(this.name)

             
            
            this.description.innerHTML = limitLetters(item.Description,100)
            this.content.appendChild(this.description)

            
            
            
            this.price.innerHTML = formatPrice(parseFloat(item.Amount))
            this.content.appendChild(this.price)

            
            
            this.delivered.innerHTML = "<span>Entregue por:</span> "+item.Delivered
            this.content.appendChild(this.delivered)

            
            
            this.cartAbsoluteRight.style.backgroundColor = this.themeColor 
            this.cartAbsoluteRight.addEventListener("click", async () => {
              await this.addToCard.additem(item.Id)
              this.amountItemsCard.execute()
            })
 
       
          
            this.innerImageCart.setAttribute("src",'/images/cart.svg')
            this.cartAbsoluteRight.appendChild(this.innerImageCart)
            this.wrapper.appendChild(this.cartAbsoluteRight)

            this.container?.appendChild(this.wrapper)
    }
}