export const idCategoriesRecursive = (cat) => {
    return cat.reduce( (increment,category) => {
        allIdsForShowItems.push(category.Id)
        idCategoriesRecursive(category.children)
        return allIdsForShowItems
    },[] )
}