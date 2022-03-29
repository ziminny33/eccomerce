import { itemLocalStorageOrderId } from './../../utils/localstorageVars';
import { CartItem } from './../../interfaces/Cartitem';
 
import { itemLocalstorage, itemLocalStorageToken } from "../../utils/localstorageVars";
import { baseUrl } from '../../app';
import { ResponseOrderItemAddCollectionEcommerce as Response } from '../../interfaces/ResponseORderItemAddCollectionEcommerce';

export class FinalizeCart {

    public async execute() {
        const storageItems = localStorage.getItem(itemLocalstorage)
       

        if(storageItems) {
            const token = localStorage.getItem(itemLocalStorageToken)
            const orderId = localStorage.getItem(itemLocalStorageOrderId)
            const items = JSON.parse(storageItems) as CartItem[]

            const Data = items.reduce( (increment,cartItem,array,index) => {

                increment.push({
                    ItemId:cartItem.item.Id,
                    Quantity:cartItem.amount
                })


                return increment
            },[])

       
            

            const body = {
                QrCode:orderId ,
                Data
            }

           

            try {
                const response = await fetch(`${baseUrl}/OrderItem/AddCollectionEcommerce`,{
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json' ,
                     Accept: 'application/json',
                     Authorization : `Bearer ${token}`,
                    },
                    body:JSON.stringify(body)
                }
                )
                const jsonResponse = await response.json() as Response

                if(jsonResponse.Success) {
                    console.log("Success");
                    
                }
                
                
            } catch (error) {
                console.log(error);
                
            }
            
        }
    }

}