import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;


  return (
    <li className="py-3">
      <div className="flex justify-between">
        <p className="text-sm">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>

        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
      </div>

      <p className="text-sm text-stone-500 italic">{isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}</p>
    </li>
  );
}

export default OrderItem;
