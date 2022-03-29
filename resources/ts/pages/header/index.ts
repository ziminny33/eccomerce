import { AmountItemsCard } from "./AmountItemsCard"
import { ScrollChangeSize } from "./ScrollChangeSize"

export const header = () => {
    const { isMobile , isDefaultNavigation } = window.fillVariables
 
    // If not mobile device, WEB
    new AmountItemsCard().execute()
    if(!isMobile && isDefaultNavigation) {
        new ScrollChangeSize().onScroll() 
       
    }
}