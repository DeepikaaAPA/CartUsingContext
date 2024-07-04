import { useContext, useState, useEffect } from "react";
import { CartContext } from "./App";

export function ItemCard({ item }) {
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
        <h5>Quantity</h5>
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
