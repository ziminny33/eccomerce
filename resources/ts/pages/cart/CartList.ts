import { formatPrice } from './../../utils/formatPrice';
import { CartItem } from "../../interfaces/Cartitem";
import { limitLetters } from "../../utils/limitLetters";
import { itemLocalstorageCartItems } from "../../utils/localstorageVars";
import { BaseClass } from "../BaseClass";
import { FinalizeCart } from './FinalizeCart';

export class CartList extends BaseClass{

    private cartContainer:HTMLDivElement

    //header
    private cartSectionButtonAndMarketplaceName:HTMLDivElement
    private cartArrowBackButton:HTMLButtonElement
    private cartArrowBackImage:HTMLImageElement
    private cartMarketplaceName:HTMLParagraphElement

    private cartClearButton:HTMLButtonElement
    private cartClearImage:HTMLImageElement
 

    //cart item
    private cartItemContainer:HTMLDivElement
    
    private cartItemContent:HTMLDivElement

    private cartItemContainerImage:HTMLDivElement
    private cartItemImage:HTMLImageElement

    private cartItemNameAndPrice:HTMLDivElement
    private cartItemName:HTMLParagraphElement
    private cartItemPrice:HTMLParagraphElement

    private cartItemAddOrRemoveContainer:HTMLDivElement
    private cartItemAdd:HTMLButtonElement
    private cartItemAddOrRemoveTotal:HTMLParagraphElement
    private cartItemRemove:HTMLButtonElement

    private cartItemDescription:HTMLParagraphElement

    private cartItemTotalPrice:HTMLDivElement

    private cartTotalContainer:HTMLDivElement
    private cartTotalName:HTMLParagraphElement
    private cartTotalPrice:HTMLParagraphElement

    private cartTaxContainer:HTMLDivElement
    private cartTaxName:HTMLParagraphElement
    private cartTaxPrice:HTMLParagraphElement

    private cartSubTotalContainer:HTMLDivElement
    private cartSubTotalName:HTMLParagraphElement
    private cartSubTotalPrice:HTMLParagraphElement

    private cartAmountSumContainer:HTMLDivElement

    private cartFinalizeButton:HTMLButtonElement

    private cartNoExistsCartListMessage:HTMLDivElement



   
   

    constructor() {
        super()

    }

    private createElementsHeader() {
               // header
               this.cartSectionButtonAndMarketplaceName = document.createElement("div")
               this.cartArrowBackButton = document.createElement("button")
               this.cartArrowBackImage = document.createElement("img")
               this.cartContainer = this.$(".cart-container")
               this.cartMarketplaceName = document.createElement("h2")
               this.cartClearButton = document.createElement("button")
               this.cartClearImage = document.createElement("img")
         
        
    }


    private addClassHeader() {
        //header
        this.cartSectionButtonAndMarketplaceName.classList.add("cart-section-button-and-marketplace-name")
        this.cartArrowBackButton.classList.add("cart-arrow-back-button")
        this.cartArrowBackImage.classList.add("cart-arrow-back-imag")
        this.cartMarketplaceName.classList.add("cart-marketplace-name")
        this.cartClearButton.classList.add("cart-clear-button")
        this.cartClearImage.classList.add("cart-clear-image")
     
    }

    private createElementsCartItem() {
        // cart item
        this.cartItemContainer = document.createElement("div")

        this.cartItemContent = document.createElement("div")

        this.cartItemContainerImage = document.createElement("div")
        this.cartItemImage = document.createElement("img")

        this.cartItemNameAndPrice = document.createElement("div")
        this.cartItemName = document.createElement("h4")
        this.cartItemPrice = document.createElement("p")

        this.cartItemAddOrRemoveContainer = document.createElement("div")
        this.cartItemAdd = document.createElement("button")
        this.cartItemAddOrRemoveTotal = document.createElement("p")
        this.cartItemRemove = document.createElement("button")

        this.cartItemDescription = document.createElement("h5")

        this.cartItemTotalPrice = document.createElement("div")
    }

    private addClassCartItem() {
               //cart

               this.cartItemContent.classList.add("cart-item-content")
        
               this.cartItemContainer.classList.add("cart-item-container")
       
               this.cartItemContainerImage.classList.add("cart-item-container-image")
               this.cartItemImage.classList.add("cart-item-image")
           
               this.cartItemNameAndPrice.classList.add("cart-item-name-and-price")
               this.cartItemName.classList.add("cart-item-name")
               this.cartItemPrice.classList.add("cart-item-price")
           
               this.cartItemAddOrRemoveContainer.classList.add("cart-item-add-or-remove-container")
               this.cartItemAdd.classList.add("cart-item-add")
               this.cartItemAddOrRemoveTotal.classList.add("cart-item-add-or-remove-total")
               this.cartItemRemove.classList.add("cart-item-remove")
           
               this.cartItemDescription.classList.add("cart-item-description")
           
               this.cartItemTotalPrice.classList.add("cart-item-total-price")
    }

    private createElementsAmountSum() {



        // amount sum
        this.cartTotalContainer = document.createElement("div")
        this.cartTotalName = document.createElement("p")
        this.cartTotalPrice = document.createElement("p")
    
        this.cartTaxContainer = document.createElement("div")
        this.cartTaxName = document.createElement("p")
        this.cartTaxPrice = document.createElement("p")
    
        this.cartSubTotalContainer = document.createElement("div")
        this.cartSubTotalName = document.createElement("p")
        this.cartSubTotalPrice = document.createElement("p")
        this.cartAmountSumContainer = document.createElement("div")

        this.cartFinalizeButton = document.createElement("button")
 
    }

    private addClassAmountSum() {

       

        this.cartTotalContainer.classList.add("cart-total-container")
        this.cartTotalName.classList.add("cart-total-name")
        this.cartTotalPrice.classList.add("cart-total-price")
    
        this.cartTaxContainer.classList.add("cart-tax-container")
        this.cartTaxName.classList.add("cart-tax-name")
        this.cartTaxPrice.classList.add("cart-tax-price")
    
        this.cartSubTotalContainer.classList.add("cart-sub-total-container")
        this.cartSubTotalName.classList.add("cart-sub-total-name")
        this.cartSubTotalPrice.classList.add("cart-sub-total-price")

        this.cartFinalizeButton.classList.add("cart-finalize-button")
        
    }

    private amountSumMount() {

        this.cartTotalName.textContent = "Total"
        
        this.cartTotalContainer.appendChild(this.cartTotalName)
        this.cartTotalContainer.appendChild(this.cartTotalPrice)

        this.cartTaxName.textContent = "Taxa"
        this.cartTaxPrice.textContent = "R$ 0.00"
        this.cartTaxContainer.appendChild(this.cartTaxName)
        this.cartTaxContainer.appendChild(this.cartTaxPrice)

        this.cartSubTotalName.textContent = "Subtotal"
        this.cartSubTotalContainer.appendChild(this.cartSubTotalName)
        this.cartSubTotalContainer.appendChild(this.cartSubTotalPrice)

        this.cartAmountSumContainer.appendChild(this.cartTotalContainer)
        this.cartAmountSumContainer.appendChild(this.cartTaxContainer)
        this.cartAmountSumContainer.appendChild(this.cartSubTotalContainer)
        this.cartAmountSumContainer.appendChild(this.cartFinalizeButton)

        this.cartContainer.appendChild(this.cartAmountSumContainer)

        this.cartFinalizeButton.textContent = "Finalizar Pedido"

        this.cartFinalizeButton.addEventListener("click", () => {
                new FinalizeCart().execute(this.cartFinalizeButton)
        })

        

    }

    private amountSumCalc() {
        const storage = localStorage.getItem(itemLocalstorageCartItems)

        if(storage) {

            if(!this.cartAmountSumContainer.classList.contains("cart-amount-sum-container")) {
                this.cartAmountSumContainer.classList.add("cart-amount-sum-container")
                this.amountSumMount()
            }

            const items = JSON.parse(storage) as CartItem[]

            const total = items.reduce( (increment,item) => {
                increment += item.total

                return increment
            },0)

            this.cartTotalPrice.textContent = formatPrice(total)
            this.cartSubTotalPrice.textContent = formatPrice(total)
        }
    }

    private noExistsItemListMessage() {
        console.log("Caiu aqui");
   
        
        
        this.cartNoExistsCartListMessage = document.createElement("div")

        const storage = localStorage.getItem(itemLocalstorageCartItems)  
        const items = JSON.parse(storage || '[]') as CartItem[]
        console.log(items);

        if(!this.cartNoExistsCartListMessage.classList.contains("cart-no-exists-cart-list-message")
         && !items.length
        ) {
            
            this.cartNoExistsCartListMessage.classList.add("cart-no-exists-cart-list-message")

            this.cartNoExistsCartListMessage.textContent = "Você não tem nenhum item adicionado ao carrinho ainda!"
            this.cartContainer.appendChild(this.cartNoExistsCartListMessage)
        }
        



    }

  

    private header() {
        
        this.cartArrowBackButton.appendChild(this.cartArrowBackImage)
        this.cartArrowBackButton.addEventListener("click",  () => {
            location.href = "/product"
        })

        this.cartClearButton.appendChild(this.cartClearImage)

        this.cartClearButton.addEventListener("click", () => {
            this.cartItemContainer.remove()
            const items = [...document.querySelectorAll(".cart-item-container")]

            items.forEach(element => {
                element.remove()
           });
          
           this.cartAmountSumContainer.remove()
            localStorage.removeItem(itemLocalstorageCartItems)
            this.noExistsItemListMessage();
             
        })

        this.cartArrowBackImage.setAttribute("src","/images/icon-back.svg")
        this.cartClearImage.setAttribute("src","/images/icon-clear.svg")
        this.cartSectionButtonAndMarketplaceName.appendChild(this.cartArrowBackButton)
        this.cartSectionButtonAndMarketplaceName.appendChild(this.cartMarketplaceName)
        this.cartSectionButtonAndMarketplaceName.appendChild(this.cartClearButton)
        this.cartMarketplaceName.textContent = "Carrinho"

         

        
         
        this.cartContainer.appendChild(this.cartSectionButtonAndMarketplaceName)
 
        
    }

    private itemCart(cartItem:CartItem) {

        this.cartItemImage.setAttribute("src",cartItem.item.Image || '/images/no-image.png')
        this.cartItemContainerImage.appendChild(this.cartItemImage)
       
        
        this.cartItemName.textContent = cartItem.item.Name 
        this.cartItemPrice.textContent = formatPrice(parseFloat(cartItem.item.Amount))

        this.cartItemNameAndPrice.appendChild(this.cartItemName)
        this.cartItemNameAndPrice.appendChild(this.cartItemPrice)
 
        this.cartItemAdd.textContent = "+"
        this.cartItemRemove.textContent = "-"
        this.cartItemAddOrRemoveTotal.textContent = String(cartItem.amount)
                

        this.cartItemAddOrRemoveContainer.appendChild(this.cartItemAdd)
        this.cartItemAddOrRemoveContainer.appendChild(this.cartItemAddOrRemoveTotal)
        this.cartItemAddOrRemoveContainer.appendChild(this.cartItemRemove)

   
        this.cartItemContent.appendChild(this.cartItemContainerImage)
        this.cartItemContent.appendChild(this.cartItemNameAndPrice)
        this.cartItemContent.appendChild(this.cartItemAddOrRemoveContainer)

        
        this.cartItemDescription.textContent = limitLetters(cartItem.item.Description,28)
        this.cartItemContainer.style.borderTopColor = window.fillVariables.themeColor
        this.cartItemContainer.appendChild(this.cartItemContent)
        this.cartItemContainer.appendChild(this.cartItemDescription)
        this.cartItemTotalPrice.textContent = "Total "+formatPrice(cartItem.total)
        this.cartItemTotalPrice.style.backgroundColor = window.fillVariables.themeColor
        this.cartItemContainer.appendChild(this.cartItemTotalPrice)

        this.increase(cartItem,this.cartItemAdd,this.cartItemAddOrRemoveTotal,this.cartItemTotalPrice)
        this.decrease(cartItem,this.cartItemRemove,this.cartItemAddOrRemoveTotal,this.cartItemTotalPrice)

 
        this.cartContainer.appendChild(this.cartItemContainer)
    }

 

    public make() {
        const storage = localStorage.getItem(itemLocalstorageCartItems)

        if(storage) {



            const items = JSON.parse(storage) as CartItem[]

            items.forEach( item => {
                this.createElementsCartItem()
                this.addClassCartItem()
                this.itemCart(item)
  
            })
        }
        
    }

    private addToCart(cartItem:CartItem ,total:number,totalPrice:HTMLDivElement) {


        const storage = localStorage.getItem(itemLocalstorageCartItems)

        if(storage) {
            const itemsLocalStorage = JSON.parse(storage) as CartItem[]

            const itemSelected = itemsLocalStorage.find( item => item.item.Id == cartItem.item.Id)

            
            itemSelected.amount = total
            itemSelected.total = total * parseFloat(itemSelected.item.Amount)

            const findRemoveCurrentCard = itemsLocalStorage.filter( item => item.item.Id != itemSelected.item.Id )

            const newCart:CartItem[] = [
                ...findRemoveCurrentCard,
                itemSelected
            ]

            localStorage.setItem(itemLocalstorageCartItems,JSON.stringify(newCart))
            totalPrice.textContent = "Total "+formatPrice(itemSelected.total)

        }




    }



    private increase(itemCart:CartItem, element:HTMLButtonElement,target:HTMLElement,totalPrice:HTMLDivElement) :void {
        element.addEventListener("click", () => {
                   
            let total = parseInt(target.textContent)

            if(typeof total === "number") {
                total++
                target.textContent = String(total)
                this.addToCart(itemCart,total,totalPrice)
                this.amountSumCalc()
            }
            
            
        })
    }

    private decrease(itemCart:CartItem, element:HTMLButtonElement,target:HTMLElement,totalPrice:HTMLDivElement) :void {
        element.addEventListener("click", () => {
                        
            let total = parseInt(target.textContent)
 
            if( typeof total === "number" && total > 1 ) {
                
                 total--
                 target.textContent = String(total)
                 this.addToCart(itemCart,total,totalPrice)
                 this.amountSumCalc()
            }
                
        })
    }

    public execute() {
        this.createElementsHeader()
        this.addClassHeader()
        this.header()
        this.make()

        this.createElementsAmountSum()
        this.addClassAmountSum()

        this.amountSumCalc()

        this.noExistsItemListMessage()

 
    }

}