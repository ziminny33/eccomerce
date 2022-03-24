import { ScrollChangeSize } from "./ScrollChangeSize"

export const header = () => {
    const { isMobile , isDefaultNavigation } = window.fillVariables
    // If not mobile device, WEB
    if(!isMobile && isDefaultNavigation) new ScrollChangeSize().onScroll()
}