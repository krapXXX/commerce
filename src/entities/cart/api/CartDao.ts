import GlobalState from "../../../features/global_state/GlobalState";
import BaseDao from "../../config/BaseDao";
import type CartType from "../model/CartType";

export default class CartDao {    
    static #cartKey = "cart-231";
    static #cartDefault:CartType = {cartItems:[], price: 0};

    static save(cart:CartType) {
        window.localStorage.setItem(CartDao.#cartKey, JSON.stringify(cart));
    }

    static restoreSaved():CartType {
        const data = window.localStorage.getItem(CartDao.#cartKey);
        if(data) {
            try {
                return JSON.parse( data );
            }
            catch(err) {
                console.error("Cart restore error:", err);
            }
        }
        return CartDao.#cartDefault;
    }
    static loadHistory():Promise<Array<CartType>> {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:8080/java231web/cart/history", {
                headers: {
                    "Authorization": "Bearer " + GlobalState.token
                }
            })
            .then(r => { 
                if(r.ok) {
                    return r.json();
                }
                reject(r.status);
            })
            .then(j => {
                // console.log(j)
                resolve(j.data);
            })
            .catch(reject);
        });
    };
     static loadOrderDetails(id:string):Promise<CartType> {
        return new Promise((resolve, reject) => {
              fetch("http://localhost:8080/java231web/cart/id/" +id, {
                headers: {
                    "Authorization": "Bearer " + "381548f8-b653-11f1-828e-62517600596c"// GlobalState.token
                }})
            .then(r => { 
                if(r.ok) {
                    return r.json();
                }
                reject(r.status);
            })
            .then(j => {
                console.log("loadOrderDetails", j)
                resolve(j.data);
            })
            .catch(reject);
        });
    }
     static calcPrices(cart:CartType) {
        let total = 0.0;
        for(let ci of cart.cartItems) {
            // if(ci.product.isInDiscount...)
            ci.price = ci.productVersion.price * ci.quantity;
            total += ci.price;
        }
        cart.price = total;
    }

}
/*
class CartDaoAsp {
>>>>>>> f4e5b0c4bc5656fa6abf43fb2562aa1359c622a2
    static #cartKey = "cart-231";
    static #cartDefault:CartType = {cartItems:[], price: 0};

    static loadHistory(): Promise<Array<CartType>> {
        
        return new Promise((resolve, reject) => {
            fetch("http://localhost:8080/java231web/cart/history", {
                headers: {
                    "Authorization": "Bearer " + GlobalState.token
                }
            })
                .then(r => {
                    if (r.ok) {
                        return r.json();
                    }
                    reject(r.status);
                })
                .then(j => {
                    // console.log(j)
                    resolve(j.data);
                })
                .catch(reject);
        });
        
    }
    static save(cart:CartType) {
        window.localStorage.setItem(CartDao.#cartKey, JSON.stringify(cart));
    }

    static restoreSaved():CartType {
        const data = window.localStorage.getItem(CartDao.#cartKey);
        if(data) {
            try {
                return JSON.parse( data );
            }
            catch(err) {
                console.error("Cart restore error:", err);
            }
        }
        return CartDao.#cartDefault;
    }
}*/

/*class CartDao {
    static #cartKey = "cart-231";
    static #cartDefault:CartType = {cartItems:[], price: 0};

    static loadOrderDetails(id:string):Promise<CartType> {
        return new Promise((resolve, reject) => {
             BaseDao.request(`api://cart/${id}`)
             .then(r => { 
                if(r.ok) {
                    return r.json();
                }
                reject(r.status);
            })
            .then(j => {
                console.log("loadOrderDetails", j)
                resolve(j.data);
            })
            .catch(reject);
        });
    }

    static loadHistory():Promise<Array<CartType>> {
        return new Promise((resolve, reject) => {
            BaseDao.request("api://cart/")
            .then(r => { 
                if(r.ok) {
                    return r.json();
                }
                reject(r.status);
            })
            .then(j => {
                // console.log(j)
                resolve(j.data);
            })
            .catch(reject);
        });
    }

    static order(cart:CartType) {
        return new Promise((resolve, reject) => {
                    BaseDao.request("api://cart/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            price: cart.price,
                            cartItems: cart.cartItems.map(ci => {return {
                                productId: ci.product.id,
                                cnt: ci.quantity,
                                price: ci.price
                            }})
                        })
                    })
                    .then(r => { 
                        if(r.ok) {
                            return r.json();
                        }
                        reject(r.status);
                    })
                    .then(j => {
                        resolve(j)
                    })
                    .catch(reject);
                });
    }

    static save(cart:CartType) {
        window.localStorage.setItem(CartDao.#cartKey, JSON.stringify(cart));
    }

    static restoreSaved():CartType {
        const data = window.localStorage.getItem(CartDao.#cartKey);
        if(data) {
            try {
                return JSON.parse( data );
            }
            catch(err) {
                console.error("Cart restore error:", err);
            }
        }
        return CartDao.#cartDefault;
    }

    static calcPrices(cart:CartType) {
        let total = 0.0;
        for(let ci of cart.cartItems) {
            // if(ci.product.isInDiscount...)
            ci.price = ci.product.price * ci.quantity;
            total += ci.price;
        }
        cart.price = total;
    }
*/