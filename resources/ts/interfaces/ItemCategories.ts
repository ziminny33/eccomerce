export interface ItemCategories {
    // Id: number,
    Name: string,
    children: ItemCategories[]
    ParentId?:number,
    CompanyId?: number,
    CreatedBy?: number,
    LastModifyBy?: number,
    CreatedDate?:Date
}