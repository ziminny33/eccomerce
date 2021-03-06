import { BaseClass } from "../BaseClass";

/**
 *  @interface SortByInterface
 *  @types asc | name | desc
 *  Types sorted
 */
export type SortByInterface = 'asc' | 
                              'name' |
                              'desc'

export default class ChangeOrder extends BaseClass {

    /**
     *  @var productSubSectionButtonSort
     *  Button sorted
     */
    private productSubSectionButtonSort:HTMLButtonElement;

    /**
     *  @var productSubSectionButtonContent
     *  Text button sorted
     */
    private productSubSectionButtonText:HTMLSpanElement;

    /**
     *  @var productSubSectionButtonContent
     *  Content wrapper options
     */
    private productSubSectionButtonContent:HTMLDivElement;

    /**
     *  @var productSubSectionRigth
     *  Container wrapper all selections and options
     */
    private productSubSectionRigth:HTMLDivElement;

    constructor() {
        super()
        this.productSubSectionButtonSort = this.$(".product-sub-section-button-sort")
        this.productSubSectionButtonText = this.$(".product-sub-section-button-text")
        this.productSubSectionButtonContent = this.$ (".product-sub-section-dropdown-content")
        this.productSubSectionRigth = this.$(".product-sub-section-rigth")
        this.showHideOptions()
    }

    /**
     *  @returns void
     *  Hide or show menu sorted
     */
    private showHideOptions():void {

        // Hide click outside
        document.addEventListener("mouseup", (event) => {
            
            if(event.target != this.productSubSectionRigth && 
                event.target != this.productSubSectionButtonContent) {
                    this.productSubSectionButtonContent.style.display = "none"  
            }

        })

        this.productSubSectionButtonSort.addEventListener("click", () => {
            let display = this.productSubSectionButtonContent.style.display
            if(display === "none" || !display)  {
                this.productSubSectionButtonContent.style.display = "flex"
                return
            }
            this.productSubSectionButtonContent.style.display = "none"

        })    
    }

    /**
     *  @param callback 
     *  @return void
     *  Callback with type sorted 
     */
    public sortBy(callback:(sort:SortByInterface) => void) {
        const classElement = document.querySelectorAll(".product-sub-section-dropdown-sort-by") 
        
        classElement.forEach( element => {
            element.addEventListener("click", () => {
                this.productSubSectionButtonContent.style.display = "none"
                this.productSubSectionButtonText.textContent = element.textContent
                const sorted = element.getAttribute("data-sort-by") as SortByInterface
                callback(sorted)
            })  
        })

    }
 

}