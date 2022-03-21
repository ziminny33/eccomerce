import glider from "../glider/glider.min.js";

export const loadGrider = () => {
    new glider(document.querySelector('.product-glider-content'), {
        slidesToShow: 5,
        slidesToScroll: 2.5,
        draggable: true,
        arrows: false,
        exactWidth:false,
        scrollPropagate: false,
        eventPropagate: true,
        scrollLock: false,                       
    });


    // Filter add class Active click
    var itemsCategories = document.querySelectorAll(".product-item")
    
    itemsCategories.forEach( (item,index) => {
        item.addEventListener("click", function()  {
            //@ts-ignore
            let itemsCategoriesArray = [...itemsCategories]
            
            let removeSelectedInArray = itemsCategoriesArray.filter(i => i != item )
                
                
            removeSelectedInArray.forEach(item => {
                item.classList.remove("selected")
            })
            item.classList.add("selected")
        })
    })
 }