import { ShowTree } from "../../interfaces/ShowTree";
import { itemLocalStorageCategories } from "../../utils/localstorageVars";
import { BaseClass } from "../BaseClass";

export class ScrollChangeSize extends BaseClass  {

    /**
     *  @var textHeader
     *  Name of company
     */
    private textHeader:HTMLDivElement

    /**
     *  @var main
     *  Main container
     */
    private main:HTMLElement

    /**
     *  @var containerLogo
     *  Container wrapper image
     */
    private containerLogo:HTMLDivElement

    /**
     *  @var logo
     *  Image company
     */
    private logo:HTMLImageElement

    /**
     *  @var text  
     *  Company name
     */
    private text:HTMLDivElement

    /**
     *  @var header
     *  Element <header> 
     */
    private header:HTMLElement

    constructor() {
        super()
        const storageItems = localStorage.getItem(itemLocalStorageCategories) 
        let categories:ShowTree = JSON.parse(storageItems) as ShowTree

        this.textHeader = this.$(".global-header-company-name") as HTMLDivElement
        this.main = this.$("main") as HTMLElement
        this.containerLogo = this.$(".global-header-logo") as HTMLDivElement
        this.logo = this.$(".global-header-logo-image") as HTMLImageElement
        this.text = this.$(".global-header-company-name") as HTMLDivElement
        this.header = this.$("header") as HTMLElement
        this.textHeader.textContent = categories.Name

        this.header.style.backgroundColor = "#f5f5f5"
        this. header.style.borderBottom = ".3px solid #DDDDDD"
        this.header.style.justifyContent = "stretch"
        this.header.style.height = "80px"
        this.main.style.paddingTop = "100px"
    }

    /**
     *  @return void
     *  Get scroll position, if 60 or more rezite to 40px, else 80px
     */
    public onScroll() {
        window.addEventListener("scroll",(e) => {
            const top = window.scrollY;
            if (top > 60) {
                this.header.style.backgroundColor = "rgba(245,245,245,.9"
                this.header.style.height = "40px"
                this.containerLogo.style.marginRight = "8px"
                this.header.style.justifyContent = "center"
                this.logo.style.height = "18px"
                this.text.style.fontSize = "16px"
                return;  
            }  
                
            this.header.style.backgroundColor = "#f5f5f5"
            this.header.style.height = "80px"
            this.containerLogo.style.marginRight = "20px"
            this.header.style.justifyContent = "stretch"
            this.logo.style.height = "36px"
            this.text.style.fontSize = "18px"
  
      })
    }

}