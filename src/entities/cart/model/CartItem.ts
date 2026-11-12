import type  IProduct  from "../../product/model/IProduct";


export default interface CartItem {
    id:               string,
    cartId:           string,
    productVersionId: string,
    productVersion:   IProductVersion,
    quantity:         number,
    price:            number
}
