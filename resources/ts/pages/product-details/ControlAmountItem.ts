import { BaseClass } from "../BaseClass";

 

export class ControlAmountItem  extends BaseClass {

    private add:HTMLButtonElement
    private remove:HTMLButtonElement
    private amount:HTMLDivElement

    constructor() {
        super()
        this.add = this.$('.details-button-rounded-action-add')
        this.remove = this.$('.details-button-rounded-action-rem')
        this.amount = this.$('.details-qtd')
        
    }

    public execute() {
        this.increase(this.add)
        this.decrease(this.remove)
    }

    public getAmount() :number {
        return parseInt(this.amount.textContent)
    }

    private increase(element:HTMLButtonElement) :void {
        element.addEventListener("click", () => {
            let total = parseInt(this.amount.textContent)

            if(typeof total === "number") {
                total++
                this.amount.textContent = String(total)
            }
            
            
        })
    }

    private decrease(element:HTMLButtonElement) :void {
        element.addEventListener("click", () => {
            let total = parseInt(this.amount.textContent)
 
            if( typeof total === "number" && total > 1 ) {
                 total--
                this.amount.textContent = String(total )
            }
                
        })
    }
}