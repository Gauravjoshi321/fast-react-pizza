import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, totalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const finalPrice = useSelector(totalPrice);
  const userName = useSelector(state => state.user.userName);
  const { status, position, address, error } = useSelector(state => state.user)

  const isSubmitting = navigation.state === "submitting";
  const isgettingAddress = status === 'loading';

  const itemStyle = "flex flex-col justify-between sm:items-center sm:flex-row gap-2 sm:gap-0";
  const checkBox = "accent-yellow-400 h-6 w-6 focus-outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-1";

  if (cart.length < 1) return <EmptyCart />;

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


        <div className="flex flex-col justify-between sm:items-center sm:flex-row gap-2 sm:gap-0 relative">

          <label className="sm:basis-40">Address</label>
          <div className="flex flex-col sm:grow sm:flex sm:flex-col">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              className="input"
            />

            {
              error !== ""
              && <p className="text-xs p-2 my-1 text-red-800 bg-red-100 rounded-lg sm:w-full w-[297px]">{error}
              </p>
            }
          </div>

          {
            address === ""
            && <span className="absolute z-50 sm:right-[5px] sm:top-[5px] right-[5px] top-[37px] md:top-[6.5px]">
              <Button type="small" onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress())
              }}>get position
              </Button>
            </span>
          }
        </div>

        <div className="mt-6 mb-3 flex gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className={checkBox}
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* Sending the desired data with type=hidden. this is a trick of sending data with the Form, so we can use it there in our order */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {
            (position.latitude && position.longitude)
              ? <input type="hidden" name="position" value={JSON.stringify(position)} />
              : null
          }

          <Button disabled={isSubmitting || isgettingAddress} type="primary">
            {isSubmitting ? "Placing Order..." : withPriority ? `Order now: pay ${finalPrice + Math.floor(finalPrice * 0.2)}` : `Order now: pay ${finalPrice}`}
          </Button>
        </div>
      </Form >
    </div >
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const obj = Object.fromEntries(data);

  const order = {
    ...obj,
    priority: obj.priority === "true",
    cart: JSON.parse(obj.cart)
  }

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please provide a correct Mobile number.";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If there are no errors then only create a new order and redirect the page accordingly.
  const newOrder = await createOrder(order);

  // DO NOT OVERUSE IT... IT CAN MAKE THINGS AGAINST REDUX (IT WAS IN PREVIOUS REDUX, DIRECTLY USING DISPATCH ON THE STORE)
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
