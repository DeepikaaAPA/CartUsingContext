import { useContext, createContext, useEffect, useState } from "react";
import products from "./Data/products.json";

import "./App.css";
const TotalContext = createContext();
function App() {
  const [cart, setCart] = useState(products);
  const initialTotal = cart
    .map((p) => p.price)
    .reduce((sum, price) => sum + price, 0);
  console.log(initialTotal);
  const [total, setTotal] = useState(initialTotal);
  return (
    <TotalContext.Provider value={total}>
      <h1>Shopping Cart</h1>
      <div className="container">
        {cart.map((p, index) => (
          <ItemCard key={index} item={p} setTotal={setTotal}></ItemCard>
        ))}
      </div>
      <Total  />
    </TotalContext.Provider>
  );
}
function Total() {
   const total = useContext(TotalContext);
  return (
    <>
      <div className="total">
        <h2>Total: Rs.{total}</h2>
      </div>
    </>
  );
}
function ItemCard({ setTotal, item }) {
  const total = useContext(TotalContext);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(item.price);
  // const [prevPrice, setPrevPrice] = useState(price);
  const [prevQty, setPrevQty] = useState(1);
  useEffect(() => {
    setPrevQty(qty);

    setPrice(qty * item.price);

    setTotal(total + item.price * qty - prevQty * item.price);
  }, [qty]);
  return (
    <div className="item-card">
      <div className="left">
        <h3>{item.title} </h3>
        {/* <img src={item.thumbnail}></img> */}
        <p>{item.description}</p>
        <h4>Price per item: Rs.{item.price}</h4>
      </div>
      <div>
        {/* {total + "****" + prevQty + " --- " + price + "Total =  "}
        {total + item.price * qty - prevQty * item.price} */}
        <h4>Price : Rs.{price}</h4>
        <button
          className="btnQty"
          onClick={() => (qty > 1 ? setQty(qty - 1) : 1)}
        >
          -
        </button>
        <input
          type="text"
          value={qty}
          onChange={(e) => {
            if (e.target.value < 1) setQty(1);
            else setQty(e.target.value);
          }}
        ></input>
        <button
          className="btnQty"
          onClick={() => (qty < 200 ? setQty(qty + 1) : 200)}
        >
          +
        </button>
        {"state Qty" + qty}
      </div>
    </div>
  );
}
export default App;
