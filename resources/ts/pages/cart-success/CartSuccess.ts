import { BaseClass } from "../BaseClass";

export class CartSuccess extends BaseClass{

    private backToHome:HTMLButtonElement;

    constructor() {
        super()
        this.backToHome = this.$(".cart-success-button-back-to-home")
    }

    public execute() {
        this.backToHome.addEventListener("click",() => {
            location.href = "/product"
        })
    }

}