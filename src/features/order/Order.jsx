// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";


function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-3 px-4">
      <div className="flex justify-between gap-3 flex-wrap mb-8">
        <h2 className="font-semibold">Order #{id} Status</h2>

        <div className="space-x-3">
          {priority && <span className="bg-red-600 text-red-50 py-1 px-3 text-xs rounded-full">Priority</span>}
          <span className="bg-green-600 text-green-50 py-1 px-3 text-xs rounded-full">{status} order</span>
        </div>
      </div>

      <div className="mb-8 bg-gray-200 p-3 flex justify-between gap-3 flex-wrap">
        <p className="text-sm font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-600">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="mb-12 flex flex-col gap-4">
        {cart.map(item => <OrderItem item={item} key={item.pizzaId} />)}
      </ul>

      <div className="bg-gray-200 p-3 flex gap-3 justify-between items-center flex-wrap">
        <div>
          <p className="text-xs mb-1">Price pizza: {formatCurrency(orderPrice)}</p>

          {priority && <p className="text-xs">Price priority: {formatCurrency(priorityPrice)}</p>}
        </div>

        <p className="text-sm font-semibold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div >
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
