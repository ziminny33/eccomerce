export const body = () => {
    
    const { isDefaultNavigation } = window.fillVariables

    if(!isDefaultNavigation) {
        const main = document.querySelector("main") as HTMLElement
        main.style.padding = "0"
    }
}