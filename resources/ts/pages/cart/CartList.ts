import { BaseClass } from "../BaseClass";

export class CartList extends BaseClass{

    private cartContainer:HTMLDivElement

    //header
    private cartMarketplaceName:HTMLParagraphElement
    private cartTremDigital:HTMLParagraphElement

    //cart item
    private cartItemContainer:HTMLDivElement

   
   

    constructor() {
        super()
        this.createElements()
        this.addClass()
    }

    private createElements() {
        // header
        this.cartContainer = this.$(".cart-container")
        this.cartMarketplaceName = document.createElement("h2")
        this.cartTremDigital = document.createElement("p")

        // cart item
        this.cartItemContainer = document.createElement("div")
        
    }

    private addClass() {
        //header
        this.cartMarketplaceName.classList.add("cart-marketplace-name")
        this.cartTremDigital.classList.add("cart-trem-digital")

        //cart
        this.cartItemContainer.classList.add("cart-item-container")
 
    }

    private header() {
        this.cartContainer.textContent = window.fillVariables.categories.Name
        this.cartTremDigital.textContent = "trem.digital"
        this.cartContainer.appendChild(this.cartMarketplaceName)
        this.cartContainer.appendChild(this.cartTremDigital)
        
    }

    private item() {
        this.cartContainer.appendChild(this.cartItemContainer)
    }

    private amountSum() {

    }

    private buttonBottom() {

    }

    public execute() {
        this.header()
        this.item()
        this.amountSum()
        this.buttonBottom()
    }

}