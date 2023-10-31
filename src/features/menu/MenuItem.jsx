import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
            !soldOut
            && <Button type={"small"}>Add To Cart</Button>
          }
        </div>

      </div>

    </li>
  );
}

export default MenuItem;
