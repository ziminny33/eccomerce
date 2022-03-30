import { CartItem } from './Cartitem';
export interface CartItemsSendToServer {
    cartItems:CartItem[]
    id:number
    orderId:string
}