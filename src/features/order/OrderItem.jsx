import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="border-t border-b divide-y">
      <div className="">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>

        <p>{formatCurrency(totalPrice)}</p>
      </div>

    </li>
  );
}

export default OrderItem;
