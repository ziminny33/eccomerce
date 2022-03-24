import { ItemShow } from './../../interfaces/ItemShow';
import { BaseClass } from "../BaseClass"
import { AddToCard } from './AddToCard';
import { ControlAmountItem } from './ControlAmountItem';
import { getIdUrl } from '../../utils/getIdUrl';

export class SelectedItem extends BaseClass {


    private detailsContainer:HTMLDivElement
    private detailsImageContainer:HTMLDivElement
    private detailsButtonBack:HTMLButtonElement
    private detailsIconback:HTMLImageElement
    private detailsProductName:HTMLParagraphElement
    private detailsProductAmount:HTMLParagraphElement
    private detailsProductDescription:HTMLParagraphElement
    private detailsFooterBottoms:HTMLDivElement
    private detailsButtonRoundedActionAdd:HTMLButtonElement
    private detailsButtonRoundedActionRem:HTMLButtonElement
    private detailsQtd:HTMLSpanElement
    private detailsButtonConfirm:HTMLButtonElement

 

    constructor() {
        super()
        this.createComponents()
        this.createClass()
        const { pathname } = location
   
       
    }

    private createComponents() {
        this.detailsContainer =  this.$(".details-container")
        this.detailsImageContainer = document.createElement("div") //this.$(".details-image-container")
        this.detailsButtonBack = document.createElement("button")//this.$(".details-button-back")
        this.detailsIconback = document.createElement("img")//this.$(".details-icon-back")
        this.detailsProductName = document.createElement("h2")//this.$(".details-product-name")
        this.detailsProductAmount = document.createElement("p")//this.$(".details-product-amount")
        this.detailsProductDescription = document.createElement("h4")//this.$(".details-product-description")
        this.detailsFooterBottoms = document.createElement("div")//this.$(".details-footer-bottoms")
        this.detailsButtonRoundedActionAdd = document.createElement("button")//this.$(".details-button-rounded-action")
        this.detailsQtd = document.createElement("span")//this.$(".details-qtd")
        this.detailsButtonRoundedActionRem = document.createElement("button")
        this.detailsButtonConfirm = document.createElement("button")//this.$(".details-button-confirm")
    }

    private createClass() {
            this.detailsButtonBack.classList.add("details-button-back")
            this.detailsImageContainer.classList.add("details-image-container")
            this.detailsIconback.classList.add("details-icon-back")
            this.detailsProductName.classList.add("details-product-name")
            this.detailsProductAmount.classList.add("details-product-amount")
            this.detailsProductDescription.classList.add("details-product-description")
            this.detailsFooterBottoms.classList.add("details-footer-bottoms")
            this.detailsButtonRoundedActionRem.classList.add("details-button-rounded-action")
            this.detailsButtonRoundedActionRem.classList.add("details-button-rounded-action-rem")
            this.detailsQtd.classList.add("details-qtd")
            this.detailsButtonRoundedActionAdd.classList.add("details-button-rounded-action")
            this.detailsButtonRoundedActionAdd.classList.add("details-button-rounded-action-add")
            this.detailsButtonConfirm.classList.add("details-button-confirm")
    }

    public async execute() {
        const {items} = window.fillVariables
     

        const response = await fetch(`/api/Item/Show/${getIdUrl()}`)
        const item = await response.json() as ItemShow

        this.detailsIconback.setAttribute("src","/images/icon-back.png")
        this.detailsButtonBack.appendChild(this.detailsIconback)
        this.detailsButtonBack.addEventListener("click" , () => {
            location.href = "/product"
        })
         
        
        this.detailsImageContainer.style.backgroundImage = `url(${item.Image})`
        this.detailsImageContainer.appendChild(this.detailsButtonBack)

        this.detailsButtonRoundedActionRem.textContent = "-"
        this.detailsFooterBottoms.appendChild(this.detailsButtonRoundedActionRem)

        this.detailsQtd.textContent = "1"
        this.detailsFooterBottoms.appendChild(this.detailsQtd)


        this.detailsButtonRoundedActionAdd.textContent = "+"
        this.detailsFooterBottoms.appendChild(this.detailsButtonRoundedActionAdd)

        this.detailsButtonConfirm.textContent = "Adicionar"
        this.detailsFooterBottoms.appendChild(this.detailsButtonConfirm)


        this.detailsContainer.appendChild(this.detailsImageContainer)

        this.detailsProductName.textContent = item.Name
        this.detailsContainer.appendChild(this.detailsProductName)

        this.detailsProductAmount.textContent = item.Amount
        this.detailsContainer.appendChild(this.detailsProductAmount)

        this.detailsProductDescription.textContent = item.Description
        this.detailsContainer.appendChild(this.detailsProductDescription)

        this.detailsContainer.appendChild(this.detailsFooterBottoms)

        new AddToCard(new ControlAmountItem()).execute()
        
    }
 

 
}