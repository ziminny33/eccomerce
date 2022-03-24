import { ItemShow } from "../../interfaces/ItemShow";
import { itemLocalstorage } from "../../utils/localstorageVars";
import { BaseClass } from "../BaseClass";

export class AmountItemsCard extends BaseClass {

    private badge:HTMLDivElement
   

    constructor() {
        super()
        this.badge = this.$(".global-footer-total-items-cart")
        
    }

    public execute() {
        if(this.getitems() && !window.fillVariables.isMobile) {
            this.badge.style.display = "flex"
            this.badge.textContent = String(this.getitems().length)
        }
        
    }

    private getitems():ItemShow[] {
        const storage = localStorage.getItem(itemLocalstorage)
        let items:ItemShow[]
        if(storage) {
             items = JSON.parse(storage) as ItemShow[]
        }

        return items
    }
}