import { createContext, useState } from "react";
import products from "./Data/products.json";

import "./App.css";
import { Total } from "./Total";
import { ItemCard } from "./ItemCard";
export const CartContext = createContext();
function App() {
  const initialTotal = products
    .map((p) => p.price)
    .reduce((sum, price) => sum + price, 0);
  console.log(initialTotal);
  const initialCart = products.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    pricePerItem: item.price,
    qty: 1,
    price: item.price,
    img: item.thumbnail,
  }));
  const [total, setTotal] = useState(initialTotal);
  const [cart, setCart] = useState([...initialCart]);
  const [totalQuantity, setTotalQuantity] = useState(initialCart.length);
  //  console.log("initial cart", cart);
  return (
    <CartContext.Provider
      value={{
        total: total,
        totalQuantity: totalQuantity,
        setTotal: setTotal,
        setTotalQuantity: setTotalQuantity,
      }}
    >
      <h1>Shopping Cart</h1>
      <div className="container">
        {cart.map((p, index) => (
          <ItemCard key={index} item={p} setTotal={setTotal}></ItemCard>
        ))}
      </div>
      <Total />
    </CartContext.Provider>
  );
}
export default App;
