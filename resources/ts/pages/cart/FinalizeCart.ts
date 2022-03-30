import { itemLocalStorageOrderId, itemLocalStorageSendeToServer } from './../../utils/localstorageVars';
import { CartItem } from './../../interfaces/Cartitem';
 
import { itemLocalstorageCartItems, itemLocalStorageToken } from "../../utils/localstorageVars";
import { baseUrl } from '../../app';
import { ResponseOrderItemAddCollectionEcommerce as Response } from '../../interfaces/ResponseORderItemAddCollectionEcommerce';
import { CartItemsSendToServer } from '../../interfaces/CartItemsSendToServer';

export class FinalizeCart {

    public async execute(elementButton:HTMLButtonElement) {
        const storageItems = localStorage.getItem(itemLocalstorageCartItems)
       

        if(storageItems) {
            const token = localStorage.getItem(itemLocalStorageToken)
            const orderId = localStorage.getItem(itemLocalStorageOrderId)
            const items = JSON.parse(storageItems) as CartItem[]

            const data = items.reduce( (increment,cartItem,array,index) => {

                increment.push({
                    ItemId:cartItem.item.Id,
                    Quantity:cartItem.amount
                })


                return increment
            },[])

            console.log(data);
            
            

            const body = {
                QrCode:orderId ,
                Data:data
            }

           

            try {
                elementButton.disabled = true
                elementButton.style.cursor = "not-allowed"
                elementButton.style.opacity = "0.9"
                elementButton.textContent = "Enviando..."

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

                    const getSendToServerStorage = localStorage.getItem(itemLocalStorageSendeToServer)

                    if(!getSendToServerStorage) {
                        console.log("CAIU AQUI");
                        
                        const itemsSavedSendToServer = [{
                            cartItems:items,
                            id:1,
                            orderId
                         }] as CartItemsSendToServer[]

                         
                         localStorage.setItem(itemLocalStorageSendeToServer,JSON.stringify(itemsSavedSendToServer))
                        
                         localStorage.removeItem(itemLocalstorageCartItems)
                         location.href = "/cart/success" 
                         return
                    }

                    const sendToServerObject = JSON.parse(getSendToServerStorage) as CartItemsSendToServer[]

                    const getLastId = sendToServerObject[sendToServerObject.length -1]
                
                    
                    const newSendToServerObjectPush = [
                        ...sendToServerObject,
                        {
                           cartItems:items,
                           id:getLastId.id+1,
                           orderId  
                        }
                    ] as CartItemsSendToServer[]
                    console.log(newSendToServerObjectPush);
                    
                    
                    localStorage.setItem(itemLocalStorageSendeToServer,JSON.stringify(newSendToServerObjectPush))
                   
                    localStorage.removeItem(itemLocalstorageCartItems)
                   
                    location.href = "/cart/success" 
   
                                     
               }     
                
                
                
            } catch (error) {
                elementButton.disabled = false
                elementButton.style.opacity = "1"
                elementButton.textContent = "Ops... Erro ao enviar"
                console.log(error);
                
            } 
            
        }
    }

}