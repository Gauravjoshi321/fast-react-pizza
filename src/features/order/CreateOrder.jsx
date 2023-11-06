import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart());

  const itemStyle = "flex flex-col justify-between sm:items-center sm:flex-row gap-2 sm:gap-0";
  const checkBox = "accent-yellow-400 h-6 w-6 focus-outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-1";

  const userName = useSelector(state => state.user.userName);

  return (
    <div className="px-4 py-4">
      <h2 className="font-bold mb-6">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="flex flex-col gap-4">

        <div className={itemStyle}>
          <label className="sm:basis-40">First Name</label>
          <input type="text" defaultValue={userName} name="customer" required className="input sm:grow uppercase" />
        </div>

        <div className="sm:flex sm:items-center">
          <label className="sm:basis-40">Phone number</label>

          <div className={`${itemStyle} sm:flex sm:flex-col sm:grow`}>
            <input type="tel" name="phone" maxLength="10" required minLength="10" className="input w-full" />

            {formErrors?.phone && <p className="text-xs p-2 my-1 text-red-800 bg-red-100 rounded-lg sm:w-full w-[297px]">{formErrors.phone}</p>}
          </div>


        </div>

        <div className={itemStyle}>
          <label className="sm:basis-40">Address</label>
          <input
            type="text"
            name="address"
            required
            className="input sm:grow"
          />
        </div>

        <div className="mt-6 mb-3 flex gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className={checkBox}
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing Order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const obj = Object.fromEntries(data);

  const order = {
    ...obj,
    priority: obj.priority === "on",
    cart: JSON.parse(obj.cart)
  }

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please provide a correct Mobile number.";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If there are no errors then only create a new order and redirect the page accordingly.
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
