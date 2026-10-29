import type  IProduct  from "../../product/model/IProduct";

export default interface CartItem {
    product: IProduct,
    quantity: number,
    price: number
}