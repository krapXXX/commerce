import type CartItem from "../../../entities/cart/model/CartItem";

export default function OrderItemCard({ cartItem }: { cartItem: CartItem }) {

     return <div className="row m-3 p-2 cart-item-card">
       <div className="col col-2">
            <img
                src={cartItem.productVersion?.imageUrl?? cartItem.productVersion?.product?.imageUrl}
                alt={cartItem.productVersion?.product?.title+cartItem.productVersion?.tittleAddon}
                className="w-100" />
            <div className="text-center">
                {cartItem.quantity}
            </div>
        </div>
        <div className="col col-6">
            <h3>{cartItem.productVersion.title}</h3>
        </div>
        <div className="col col-3 text-center">
            <h4>{cartItem.price.toMoney()} грн</h4>
        </div>
    </div>;
}
