import { useContext } from "react";
import { CartContext } from "./App";

export function Total() {
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
