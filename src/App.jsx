import { useContext, createContext, useEffect, useState } from "react";
import products from "./Data/products.json";

import "./App.css";
const TotalContext = createContext();
function App() {
  const initialTotal = products
    .map((p) => p.price)
    .reduce((sum, price) => sum + price, 0);
  console.log(initialTotal);
  const [total, setTotal] = useState(initialTotal);
  const [cart, setCart] = useState([...products]);
  console.log(cart);
  return (
    <TotalContext.Provider value={{ total: total, carts: [cart, setCart] }}>
      <h1>Shopping Cart</h1>
      <div className="container">
        {cart.map((p, index) => (
          <ItemCard key={index} item={p} setTotal={setTotal}></ItemCard>
        ))}
      </div>
      <Total />
    </TotalContext.Provider>
  );
}
function Total() {
  const { total } = useContext(TotalContext);
  return (
    <div className="total">
      <h2>Total: Rs.{total}</h2>
    </div>
  );
}
function ItemCard({ setTotal, item }) {
  const { total, carts } = useContext(TotalContext);
  const [cart, setCart] = carts;
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(item.price);
  // const [prevPrice, setPrevPrice] = useState(price);
  //setting prev price did not update correctly so setting qty instead
  const [prevQty, setPrevQty] = useState(1);
  const handleRemove = () => {
    setQty(0);

  };
  useEffect(() => {
    if(qty===0)
      setCart((prev) => prev.filter((product) => product.id !== item.id));
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
        <button className="btn-remove" onClick={handleRemove}>
          Remove item
        </button>
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
