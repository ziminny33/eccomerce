import { ItemCategories } from "../interfaces/ItemCategories"
import { ItemShow } from "../interfaces/ItemShow"
import { limitLetters } from "../utils/limitLetters"
import { loadGrider } from "../utils/loadGrider"
import { recursiveCategory } from "../utils/recursiveCategory"
import { totalCategoriesLength } from "../utils/totalCategoriesLength"
import { ChangeOrder, SortByInterface } from "./changeOrder"

    window.loadGlider = loadGrider
 
    window.products = () => {
                const { categories, items, themeColor ,isMobile } = window.fillVariables
                const changeOrder = new ChangeOrder()
             

                let allIdsForShowItems:number[] = []
                let container = document.querySelector(".product-container")
       
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
                               searchPerCategory(parseInt(categoryId),false,true)
                               categoriesChange(parseInt(categoryId))
                       })
                       
                   })
                }  
                clickChangeCategories()

              
                let filter:ItemShow[]= [] as ItemShow[]
       
                const searchPerCategory = (categoryId:number ,resetItems = false,rerenderClickBreak=false) => {
       
                   const filterCategory = recursiveCategory(categories.ItemCategories, categoryId )
                   allIdsForShowItems = []
                   if(filterCategory && filterCategory.children) idCategoriesRecursive(filterCategory.children)
       
                  let itemsFiltered = items.filter( item => {
                      return item.CategoryId ===   categoryId  ||
                      allIdsForShowItems.find( (list) => item.CategoryId == list)
                  })
                  
                  totalCategoriesLength(resetItems ? items.length : itemsFiltered.length);
                  
                    filter = resetItems ? items : itemsFiltered
                  
                 
                  const fill = (filter:ItemShow[]) => {
                        
                       console.log("DENTRO FILL");
                       

                        filter.forEach( item => {
       
                                let content = document.createElement("div")
                                content.classList.add('product-cart-item')
                                content.style.borderTopColor = themeColor
                       
                       
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
                                cartAbsoluteRight.style.backgroundColor = themeColor 
                                let innerImageCart = document.createElement("img")
                                innerImageCart.setAttribute("src",'/images/cart.svg')
                                cartAbsoluteRight.appendChild(innerImageCart)
                                content.appendChild(cartAbsoluteRight)
                   
                                container?.appendChild(content)
                                })

                  }
                  if(!rerenderClickBreak) {
                  changeOrder.sortBy( (sort:SortByInterface) => {
                        removeAllItems()
                        console.log("Dentro sortby");
                           
                        
                          switch (sort) {
                                case "asc":
                                        
                                        break;
                                case "desc":

                                        break
                                
                                case "name":
                                         
                                       
                                        filter = filter.sort((a,b) => a.Name > b.Name ? 1 : -1)
                                        break;
                          }

                         fill(filter)
                  })
                }
                  fill(filter)
                  

                  
                }
      
       
                 const idCategoriesRecursive = (cat:ItemCategories[]) => {
                      
                       return cat.reduce( (increment,category):Array<number> => {
                           allIdsForShowItems.push(category.Id)
                           idCategoriesRecursive(category.children)
                           return allIdsForShowItems
                       },[] )
                 }
       
                
                const categoriesChange = (categoryId:number,resetAll = false,removeBreadcrumb = false) => {
                   const gliderContainer = document.querySelector("#product-glider-container")
                   
                   
                   
                   const filterCategory = recursiveCategory(categories.ItemCategories,categoryId) 
                
                         
        
                   if(filterCategory?.children?.length || resetAll) {
                    
                        if(!removeBreadcrumb) breadcrumbsChange(filterCategory,resetAll);
                        
                        gliderContainer?.remove()
       
                        const gliderWrapper = document.querySelector(".glider-wrapper")
                       
                        const newGliderContainer = document.createElement("div")
                        newGliderContainer.classList.add(".glider-contain")
                        newGliderContainer.classList.add(".product-glider-container")
                        newGliderContainer.id = "product-glider-container"
                        gliderWrapper?.appendChild(newGliderContainer)
       
                        const gliderContent = document.createElement("div")
                        gliderContent.classList.add("product-glider-content")
       
                        newGliderContainer.appendChild(gliderContent)
       
                        if(resetAll) {
                          
                           categories.ItemCategories.forEach( item => {
                               let button = document.createElement("button")
                               button.setAttribute("data-id",String(item.Id))
                               button.classList.add("product-item")
                               button.innerHTML = item.Name
                               gliderContent.appendChild(button)
                               
                            })
                            clickChangeCategories()
                            breadCrumbsEvent(false)
                             
                        } else {
       
                            filterCategory.children.forEach( item => {
                               let button = document.createElement("button")
                               button.setAttribute("data-id",String(item.Id))
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
                
                const breadcrumbsChange = (category:ItemCategories,resetAll:boolean) => {
                  
                    const container = document.querySelector(".product-breadcrumb-container")
                   
                       if(!resetAll) {
                           const button = document.createElement("button")
                           button.classList.add("product-breadcrumb-button")
                           button.setAttribute("data-breadcrumbs-id",String(category.Id))
                           button.innerHTML = "&nbsp;/ "+category.Name
                           container?.appendChild(button)
                           
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

                    const buttons = document.querySelectorAll(".product-breadcrumb-button")
                     
                    const [allCategories,...arrayButtons] = [...buttons]  
                   if(rerender) {
                       allCategories.addEventListener("click",() => {
                       categoriesChange(0,true)
                       removeAllItems()
                       searchPerCategory(0,true,true)
                       totalCategoriesLength(items.length)
                    })
                   }
       

                    arrayButtons.forEach((button,index) => {
                       button.addEventListener("click" , () => {
                               if(arrayButtons.length -1 != index) {
                                   const categoryId = button.getAttribute("data-breadcrumbs-id")
       
                                   arrayButtons.forEach((element,indexElement) => {
                                          if(index < indexElement) {
                                           arrayButtons[indexElement].remove()
                                            
                                          }
                                        
                                   })
                                   removeAllItems()
                                   categoriesChange(parseInt(categoryId),false,true)
                                   searchPerCategory(parseInt(categoryId))
                                  
                               }
                          
                       })
                    });
                }
                breadCrumbsEvent()
                 searchPerCategory(0,true)
}

 