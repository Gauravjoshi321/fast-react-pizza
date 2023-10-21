import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";


function Menu() {
  const menu = useLoaderData();

  return (
    <div>
      {menu.map(pizza => <MenuItem pizza={pizza} key={pizza.name} />)}
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
