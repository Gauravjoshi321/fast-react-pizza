import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">

      <p className="mb-1">
        {quantity}&times; {name}
      </p>

      <div className="flex justify-between items-center space-x-6">
        <p className="font-bold text-sm">{formatCurrency(totalPrice)}</p>
        <Button type="small">delete</Button>
      </div>

    </li>
  );
}

export default CartItem;
