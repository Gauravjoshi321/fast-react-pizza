import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="border-b divide-y">
      <div className="flex justify-between">
        <p className="text-sm">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>

        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
      </div>

    </li>
  );
}

export default OrderItem;
