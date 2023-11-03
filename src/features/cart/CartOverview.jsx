import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { totalPrice, totalQuantity } from "./cartSlice";

function CartOverview() {

  const cartTotalQuantity = useSelector(totalQuantity);
  const cartTotalPrice = useSelector(totalPrice);

  if (!cartTotalQuantity) return;

  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase p-4">
      <p className="text-stone-300 font-semibold space-x-4">
        <span>{cartTotalQuantity} pizzas</span>
        <span>${cartTotalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div >
  );
}

export default CartOverview;
