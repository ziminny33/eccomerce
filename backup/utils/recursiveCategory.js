import { hasChildren } from "./hasChildren"

export const recursiveCategory = (categoryFind, categoryId) => {
   return  categoryFind.reduce( (increment,category) => {
    if(hasChildren(category) || category.Id == categoryId) {
        if(category.Id != categoryId)  
           return recursiveCategory(category.children,categoryId)
        return category 
    }
    return increment
 },[])

}