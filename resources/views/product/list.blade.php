@extends('layouts.app')

@section('title','Produtos')
@section('css')
    <link rel="stylesheet" type="text/css" href="/js/glider/glider.css">
@endsection

@section('body')
    @include('utils.breadcrumbs')
    @include('layouts.product.categories')
    @include('layouts.product.sub-section-order')
    @include('layouts.product.card-container')
@endsection

@section('script')
    
    <script type="text/javascript" defer>

 let allIdsForShowItems = []

 const limitLetters = (string,limit) => {
          
        if(string.length >= limit) {
            let result = ""
            for (let index = 0; index <= limit; index++) {
                result+=string[index];
            }
            return result+"..."
        }
        return string
 }

 function hasChildren(node) {
            return (typeof node === 'object')
                && (typeof node.children !== 'undefined')
                && (node.children.length > 0);
         }




         let categories = {!! json_encode($categories) !!} 
         let items = {!! json_encode($items) !!} 
         let container = document.querySelector(".product-container")
        
         let textHeader = document.querySelector(".global-center-text")
         textHeader.innerHTML = categories.Name

         // Remove all items 
            const removeAllItems = () => {
                document.querySelectorAll(".product-cart-item").forEach(element => {
                    element.remove()
                });
            }
            
         // END

         const itemCategoryArray = () => {
            const itemCategory = document.querySelectorAll(".product-item")
            return [...itemCategory]
         }

         const clickChangeCategories = () => {
 
          
            itemCategoryArray().forEach(item => {
                item.addEventListener("click", () => {
               
                        removeAllItems()
                        const categoryId = item.getAttribute("data-id")
                        searchPerCategory(categoryId)
                        categoriesChange(categoryId)
                        console.log("TESTE");
                   
                })
                
            })
         }  
         
         
         clickChangeCategories()

 

         const searchPerCategory = (categoryId ,resetItems = false) => {

            const filterCategory = recursive(categories.ItemCategories,categoryId)
            allIdsForShowItems = []
            if(filterCategory && filterCategory.children) idCategoriesRecursive(filterCategory.children)

           let itemsFiltered = items.filter( item => {
               return item.CategoryId ===  parseInt(categoryId) ||
               allIdsForShowItems.find( (list) => item.CategoryId == list)
           })
           console.log("FILTER",allIdsForShowItems);

           let filter = resetItems ? items : itemsFiltered
        
           filter.forEach( item => {

             let content = document.createElement("div")
             content.classList.add('product-cart-item')
    
    
             let image = document.createElement("div")
             image.classList.add('product-cart-image')
             let innerImage = document.createElement("img")
             innerImage.setAttribute("src",item.Image)
             image.appendChild(innerImage)
             content.appendChild(image)
    
             let name = document.createElement("div")
             name.classList.add('product-cart-name')
             name.textContent = item.Name
             content.appendChild(name)
    
             let description = document.createElement("div")
             description.classList.add('product-cart-description-small')
             description.innerHTML = limitLetters(item.Description,100)
             content.appendChild(description)
    
             let price = document.createElement("div")
            
             price.classList.add('product-cart-price')
             price.innerHTML = item.Amount
             content.appendChild(price)
    
             let delivered = document.createElement("div")
             delivered.classList.add('product-cart-delivered')
             delivered.innerHTML = "<span>Entregue por:</span> Alguma empresa"
             content.appendChild(delivered)
    
             let cartAbsoluteRight = document.createElement("div")
             cartAbsoluteRight.classList.add('product-cart-add-item')
             cartAbsoluteRight.style.backgroundColor = '{{ $themeColor }}'
             let innerImageCart = document.createElement("img")
             innerImageCart.setAttribute("src",'/images/cart.svg')
             cartAbsoluteRight.appendChild(innerImageCart)
             content.appendChild(cartAbsoluteRight)

             container.appendChild(content)
             })
         }

         const loadGrider = () => {
            new Glider(document.querySelector('.product-glider-content'), {
                slidesToShow: 5,
                slidesToScroll: 2.5,
                draggable: true,
                arrows: false,
                exactWidth:false,
                scrollPropagate: false,
                eventPropagate: true,
                scrollLock: false,
                arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
                }
            });


            // Filter add class Active click
            var itemsCategories = this.document.querySelectorAll(".product-item")
            
            itemsCategories.forEach( (item,index) => {
                item.addEventListener("click", function()  {
                    
                    let itemsCategoriesArray = [...itemsCategories]
                    
                    let removeSelectedInArray = itemsCategoriesArray.filter(i => i != item )
                        
                    removeSelectedInArray.forEach(item => {
                        item.classList.remove("active")
                    })
                    item.classList.add("active")
                })
            })
         }

     
        //  let getLastSelected
        //  let filterCategory


         
         const recursive = (categoryFind, categoryId) => {
            return  categoryFind.reduce( (increment,category) => {
             if(hasChildren(category) || category.Id == categoryId) {
                 if(category.Id != categoryId)  
                    return recursive(category.children,categoryId)
                 return category 
             }
             return increment
          },[])

         }

 
          const categoriesFiltered = recursive(categories.ItemCategories,117).children 

          

          const idCategoriesRecursive = (cat) => {
                return cat.reduce( (increment,category) => {
                    allIdsForShowItems.push(category.Id)
                    idCategoriesRecursive(category.children)
                    return allIdsForShowItems
                },[] )
          }


 
          
         
         const categoriesChange = (categoryId,resetAll = false,removeBreadcrumb = false) => {
            const gliderContainer = document.querySelector("#product-glider-container")
            
            
            
            const filterCategory = recursive(categories.ItemCategories,categoryId) 
         
                  
 
            if(filterCategory?.children?.length || resetAll) {
             
                 if(!removeBreadcrumb) breadcrumbsChange(filterCategory,resetAll);
                 
                 gliderContainer.remove()

                 const gliderWrapper = document.querySelector(".glider-wrapper")
                
                 const newGliderContainer = document.createElement("div")
                 newGliderContainer.classList.add(".glider-contain")
                 newGliderContainer.classList.add(".product-glider-container")
                 newGliderContainer.id = "product-glider-container"
                 gliderWrapper.appendChild(newGliderContainer)

                 const gliderContent = document.createElement("div")
                 gliderContent.classList.add("product-glider-content")

                 newGliderContainer.appendChild(gliderContent)

                 if(resetAll) {
                   
                    categories.ItemCategories.forEach( item => {
                        let button = document.createElement("button")
                        button.setAttribute("data-id",item.Id)
                        button.classList.add("product-item")
                        button.innerHTML = item.Name
                        gliderContent.appendChild(button)
                        
                     })
                     clickChangeCategories()
                     breadCrumbsEvent(false)
                      
                 } else {

                     filterCategory.children.forEach( item => {
                        let button = document.createElement("button")
                        button.setAttribute("data-id",item.Id)
                        button.classList.add("product-item")
                        button.innerHTML = item.Name
                        gliderContent.appendChild(button)
                        
                     })
                     clickChangeCategories()
                     breadCrumbsEvent(false)
                 }

                 loadGrider()
             }
             
         }
         
         const breadcrumbsChange = (category,resetAll) => {
           
             const container = document.querySelector(".product-breadcrumb-container")
            
              
                if(!resetAll) {
                    console.log("CAIU AQUI");
                    const button = document.createElement("button")
                    button.classList.add("product-breadcrumb-button")
                    button.setAttribute("data-breadcrumbs-id",category.Id)
                    button.innerHTML = "&nbsp;/ "+category.Name
                    container.appendChild(button)
                    
                    return
                }
                 allIdsForShowItems = []
                const buttons = document.querySelectorAll(".product-breadcrumb-button")
                const [_,...buttonArray] = [...buttons]
                buttonArray.forEach((item,index) => {
                    item.remove()
                })
              

         }

         const breadCrumbsEvent = (rerender = true) => {
            const container = document.querySelector(".product-breadcrumb-container")
             const buttons = document.querySelectorAll(".product-breadcrumb-button")

             const [allCategories,...arrayButtons] = [...buttons]  
            if(rerender) {
                allCategories.addEventListener("click",() => {
                 console.log("dsdsd");
                categoriesChange(0,true)
                removeAllItems()
                searchPerCategory(0,true)
             })
            }


             
             arrayButtons.forEach((button,index) => {
                button.addEventListener("click" , () => {
                        if(arrayButtons.length -1 != index) {
                            const categoryId = button.getAttribute("data-breadcrumbs-id")

                            arrayButtons.forEach((element,indexElement) => {
                                const categoryIdElement = button.getAttribute("data-breadcrumbs-id")
                                
                                  console.log("INDEX ",index," INDEXELEMENT ",indexElement);
                                   if(index < indexElement) {
                                    arrayButtons[indexElement].remove()
                                     
                                   }
                                 
                            })
                            removeAllItems()
                            categoriesChange(categoryId,false,true)
                            searchPerCategory(categoryId)
                           
                        }
                   
                })
             });
         }
         breadCrumbsEvent()
         
    </script>
@endsection



 
 