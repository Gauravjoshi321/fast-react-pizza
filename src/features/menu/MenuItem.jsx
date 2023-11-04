import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getItemQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/updateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleClick() {
    const item = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }

    dispatch(addItem(item));
  }
  const itemQuantity = useSelector(getItemQuantity(id));


  return (
    <li className="flex p-2 gap-4">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "grayscale opacity-70" : ""}`} />

      <div className="flex flex-col grow">
        <p className="font-semibold">{name}</p>
        <p className="capitalize italic text-sm text-stone-500">{ingredients.join(', ')}</p>

        <div className="mt-auto flex items-center justify-between">
          {
            !soldOut
              ? <p className="text-sm text-stone-500">{formatCurrency(unitPrice)}</p>
              : <p className="text-sm text-stone-500 uppercase">Sold out</p>
          }

          {
            itemQuantity > 0
            && <div className="flex gap-6">
              <UpdateItemQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          }

          {
            !soldOut
            && itemQuantity === 0
            && <Button onClick={handleClick} type={"small"}>Add To Cart</Button>
          }
        </div>

      </div>

    </li>
  );
}

export default MenuItem;
