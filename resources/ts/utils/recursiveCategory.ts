import { ItemCategories } from './../interfaces/ItemCategories';
import { hasChildren } from "./hasChildren"

export const recursiveCategory = (categoryFind:ItemCategories[], categoryId:number):ItemCategories => {
    //@ts-ignore
    return categoryFind.reduce( (increment,category) => {
     if(hasChildren(category) || category.Id == categoryId) {
         if(category.Id != categoryId)  
            return recursiveCategory(category.children,categoryId)
            
         return category 
     }
     return increment
  },[] ) 

 }