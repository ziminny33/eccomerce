import { ItemCategories } from './../interfaces/ItemCategories';
import { hasChildren } from "./hasChildren"

export const recursiveCategory = (categoryFind:ItemCategories[], categoryName:string):ItemCategories => {
    //@ts-ignore
    return categoryFind.reduce( (increment,category) => {
     if(hasChildren(category) || category.Name == categoryName) {
         if(category.Name != categoryName)  
            return recursiveCategory(category.children,categoryName)
            
         return category 
     }
     return increment
  },[] ) 

 }