export const totalCategoriesLength = (total:number) => {
    const producSubSectionLength = document.querySelector(".product-sub-section-length") as HTMLElement
    const totalFormatted = `${total} produto(s)`

    producSubSectionLength.innerHTML = totalFormatted

}