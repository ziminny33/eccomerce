import { itemLocalStorageSendeToServer } from "../../utils/localstorageVars";
import { BaseClass } from "../BaseClass";

export class ButtonPayment extends BaseClass {

    private container:HTMLDivElement;
    private buttonPaymentDiv:HTMLDivElement
    private buttonPayment:HTMLButtonElement

    constructor() {
        super()
        this.container = this.$(".product-container")

    }

    public create():ButtonPayment {
        this.buttonPaymentDiv = document.createElement("div")
        this.buttonPaymentDiv.classList.add("product-button-payment-div-absolute")
        this.buttonPayment = document.createElement("button")
        this.buttonPayment.classList.add("product-button-payment-absolute")
        this.buttonPayment.textContent = "Efetuar pagamento"
        return this
    }

    public addToContainer():ButtonPayment {
        this.buttonPaymentDiv.append(this.buttonPayment)
        this.container.appendChild(this.buttonPaymentDiv)
        return this
    }

    public make():ButtonPayment {
        const localStorageSendToServer = localStorage.getItem(itemLocalStorageSendeToServer)
        if(localStorageSendToServer) {
            this.buttonPaymentDiv.style.display = "flex"
        }
        return this
    }
}