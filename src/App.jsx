import { useEffect, useState } from "react";
import products from "./Data/products.json";

import "./App.css";

function App() {
  const [cart, setCart] = useState(products);
  return (
    <>
      <h1>Shopping Cart</h1>
      <div className="container">
        {cart.map((p) => (
          <ItemCard item={p}></ItemCard>
        ))}
      </div>
      <Total />
    </>
  );
}
function Total() {
  return (
    <>
      <div className="total">
        <h2>Total: Rs.abcfdefgh</h2>
      </div>
    </>
  );
}
function ItemCard({ item }) {
  const [qty, setQty] = useState(1);
  const [price,setPrice]=useState(item.price)
  useEffect(()=>{setPrice(qty*item.price)},[qty])
  return (
    <div className="item-card">
      <div className="left">
        <h3>{item.title} </h3>
        <img src={item.thumbnail}></img>
        <p>{item.description}</p>
        <h4>Price per item: Rs.{item.price}</h4>
      </div>
      <div>
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
          onChange={(e) => setQty(e.target.value)}
        ></input>
        <button
          className="btnQty"
          onClick={() => (qty < 10 ? setQty(qty + 1) : 10)}
        >
          +
        </button>
        {"state Qty" + qty}
      </div>
    </div>
  );
}
export default App;
