import { ItemCategories } from './../interfaces/ItemCategories';

export const  hasChildren = (node:ItemCategories) => {
    return (typeof node === 'object')
        && (typeof node.children !== 'undefined')
        && (node.children.length > 0);
 }