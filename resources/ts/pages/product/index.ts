import { ItemCategories } from "../../interfaces/ItemCategories"
import { ItemShow } from "../../interfaces/ItemShow"
import { ShowTree } from "../../interfaces/ShowTree"
import { loadGrider } from "../../utils/loadGrider"
import { itemLocalStorageCategories, itemLocalStorageItems } from "../../utils/localstorageVars"
import { recursiveCategory } from "../../utils/recursiveCategory"
import { totalCategoriesLength } from "../../utils/totalCategoriesLength"
import { ButtonPayment } from "./ButtonPayment"
import ChangeOrder, {  SortByInterface } from "./ChangeOrder"
import FillItems from "./FillItems"


    window.loadGlider = loadGrider
 
    export const products = () => {
                const storageCategories = localStorage.getItem(itemLocalStorageCategories)
                const categories = JSON.parse(storageCategories) as ShowTree
                const items = JSON.parse(localStorage.getItem(itemLocalStorageItems)) as ItemShow[]
                const changeOrder = new ChangeOrder()
                const fillItems = new FillItems()
                 
                new ButtonPayment()
                .create()
                .addToContainer()
                .make() 

               
                let allIdsForShowItems:string[] = []
                        
                // Remove all items 
                   const removeAllItems = () => {
                       document.querySelectorAll(".product-cart-item-wrapper").forEach(element => {
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
                               const categoryName = item.getAttribute("data-id")
                               searchPerCategory(categoryName,false,true)
                               categoriesChange(categoryName)
                       })
                       
                   })
                }  
                clickChangeCategories()

              
                let filter:ItemShow[]= [] as ItemShow[]
       
                const searchPerCategory = (categoryName:string ,resetItems = false,rerenderClickBreak=false) => {
       
                   const filterCategory = recursiveCategory(categories.ItemCategories, categoryName )
                   allIdsForShowItems = []
                   if(filterCategory && filterCategory.children) idCategoriesRecursive(filterCategory.children)
       
                  let itemsFiltered = items.filter( item => {
                      return item.CategoryName ===   categoryName  ||
                      allIdsForShowItems.find( (list) => item.CategoryName == list)
                  })
                  
                  totalCategoriesLength(resetItems ? items.length : itemsFiltered.length);
                  
                    filter = resetItems ? items : itemsFiltered
                  
                 
                  const fill = (filter:ItemShow[]) => {
                        
                     
                    
                        filter?.forEach( item => {
                            fillItems
                            .createElements()
                            .addClass()
                            .make(item)
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
                      
                       return cat.reduce( (increment,category):Array<string> => {
                           allIdsForShowItems.push(category.Name)
                           idCategoriesRecursive(category.children)
                           return allIdsForShowItems
                       },[] )
                 }
       
                
                const categoriesChange = (categoryName:string,resetAll = false,removeBreadcrumb = false) => {
                   const gliderContainer = document.querySelector("#product-glider-container")
                   
                   
                   
                   const filterCategory = recursiveCategory(categories.ItemCategories,categoryName) 
                
                         
        
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
                               button.setAttribute("data-id",String(item.Name))
                               button.classList.add("product-item")
                               button.innerHTML = item.Name
                               gliderContent.appendChild(button)
                               
                            })
                            clickChangeCategories()
                            breadCrumbsEvent(false)
                             
                        } else {
       
                            filterCategory.children.forEach( item => {
                               let button = document.createElement("button")
                               button.setAttribute("data-id",String(item.Name))
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
                           button.setAttribute("data-breadcrumbs-id",String(category.Name))
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
                       categoriesChange('',true)
                       removeAllItems()
                       searchPerCategory('',true,true)
                       totalCategoriesLength(items.length)
                    })
                   }
       

                    arrayButtons.forEach((button,index) => {
                       button.addEventListener("click" , () => {
                               if(arrayButtons.length -1 != index) {
                                   const categoryName = button.getAttribute("data-breadcrumbs-id")
       
                                   arrayButtons.forEach((element,indexElement) => {
                                          if(index < indexElement) {
                                           arrayButtons[indexElement].remove()
                                            
                                          }
                                        
                                   })
                                   removeAllItems()
                                   categoriesChange(categoryName,false,true)
                                   searchPerCategory(categoryName)
                                  
                               }
                          
                       })
                    });
                }
                breadCrumbsEvent()
                categoriesChange('',true)
                searchPerCategory('',true)
}

 