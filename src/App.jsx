import { useContext, createContext, useEffect, useState } from "react";
import products from "./Data/products.json";

import "./App.css";
const CartContext = createContext();
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
  console.log("initial cart", cart);
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
function Total() {
  const { total, totalQuantity } = useContext(CartContext);
  return (
    <div className="total">
      <h2>
        Total <span className="total-quantity">({totalQuantity} items)</span> :
        Rs.{total}
      </h2>
    </div>
  );
}
function ItemCard({ item }) {
  const { setTotal, setTotalQuantity } = useContext(CartContext);
  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(item.price);
  // const [prevPrice, setPrevPrice] = useState(price);
  //setting prev price did not update correctly so setting qty instead
  const [prevQty, setPrevQty] = useState(1);
  const [showRemove, setShowRemove] = useState(true);
  const handleRemove = () => {
    setQty(0);
  };
  useEffect(() => {
    setPrevQty(qty);
    setPrice(qty * item.price);
    setTotal(
      (prevtotal) => prevtotal + item.price * qty - prevQty * item.price
    );
    setTotalQuantity((prev) => prev - prevQty + qty);
    qty === 0 ? setShowRemove(false) : setShowRemove(true);
  }, [qty]);
  return (
    <div className="item-card">
      <div className="left">
        <h3>{item.title} </h3>
        <div className="item-description">
          <img src={item.img}></img>

          <span className="desc">{item.description}</span>
        </div>

        <h4>Price per item: Rs.{item.pricePerItem}</h4>
        {showRemove ? (
          <button className="btn-remove" onClick={handleRemove}>
            Remove item
          </button>
        ) : null}
      </div>
      <div>
        {showRemove ? (
          <h4>Price : Rs.{price}</h4>
        ) : (
          <>
            <br></br>
            <br></br>
          </>
        )}

        <button
          className="btnQty"
          onClick={() => (qty > 0 ? setQty((prev) => prev - 1) : 1)}
        >
          -
        </button>
        <input
          type="text"
          value={qty}
          onChange={(e) => {
            if (e.target.value < 0 || isNaN(e.target.value)) setQty(1);
            else setQty(+e.target.value);
          }}
        ></input>
        <button className="btnQty" onClick={() => setQty((prev) => prev + 1)}>
          +
        </button>

        <br></br>
        {showRemove ? (
          ""
        ) : (
          <p className="remove-message">
            Item removed.<br></br> Increase quantity <br></br>to add it back.
          </p>
        )}
      </div>
    </div>
  );
}
export default App;
