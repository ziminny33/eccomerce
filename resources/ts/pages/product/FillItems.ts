import { ItemShow } from "../../interfaces/ItemShow";
import { ShowTree } from "../../interfaces/ShowTree";
import { formatPrice } from "../../utils/formatPrice";
import { limitLetters } from "../../utils/limitLetters";
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
      private showTree:ShowTree;

      private addToCard:AddToCard;

      private amountItemsCard:AmountItemsCard

        constructor() {
            super()
            this.themeColor = window.fillVariables.themeColor;
            this.showTree = window.fillVariables.categories
            this.container = this.$(".product-container")
            this.addToCard = new AddToCard()
            this.amountItemsCard = new AmountItemsCard()
       }

      
    /** 
     *  @param item 
     *  @return void
     *  Fill all items in screen
     */
    public execute(item:ItemShow) {
     
      
            const wrapper = document.createElement("div") as HTMLDivElement
            wrapper.classList.add('product-cart-item-wrapper')
            wrapper.style.borderTopColor = this.themeColor
           

            const content = document.createElement("div") as HTMLDivElement
            content.classList.add('product-cart-item')
            
            wrapper.appendChild(content)
        
            ClickToDetailsProduct.execute(content,item);

            let image = document.createElement("div")
            image.classList.add('product-cart-image')
            let innerImage = document.createElement("img")
            innerImage.setAttribute("src",item.Image || '/images/no-image.png')
            image.appendChild(innerImage)
            content.appendChild(image)

            let name = document.createElement("div")
            name.classList.add('product-cart-name')
            name.textContent = item.Name
            content.appendChild(name)

            let description = document.createElement("div")
            description.classList.add('product-cart-description-small')
            description.innerHTML = limitLetters(item.Description,100)
            content.appendChild(description)

            let price = document.createElement("div")
            
            price.classList.add('product-cart-price')
            price.innerHTML = formatPrice(parseFloat(item.Amount))
            content.appendChild(price)

            let delivered = document.createElement("div")
            delivered.classList.add('product-cart-delivered')
            delivered.innerHTML = "<span>Entregue por:</span> "+item.Delivered
            content.appendChild(delivered)

            let cartAbsoluteRight = document.createElement("button")
            cartAbsoluteRight.classList.add('product-cart-add-item')
            cartAbsoluteRight.style.backgroundColor = this.themeColor 
            cartAbsoluteRight.addEventListener("click", async () => {
              await this.addToCard.additem(item.Id)
              this.amountItemsCard.execute()
            })
 
       
            let innerImageCart = document.createElement("img")
            innerImageCart.setAttribute("src",'/images/cart.svg')
            cartAbsoluteRight.appendChild(innerImageCart)
            wrapper.appendChild(cartAbsoluteRight)

            this.container?.appendChild(wrapper)
    }
}