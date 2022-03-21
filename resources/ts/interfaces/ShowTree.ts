import { ItemCategories } from "./ItemCategories";

 

export interface ShowTree {
        Name: string,
        Id: number,
        Document: string,
        ItemCategories: ItemCategories[]
}