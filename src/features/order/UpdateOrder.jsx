import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right mt-4">
      <Button type="small">Make Priority</Button>
    </fetcher.Form>
  )
}

export const action = async function ({ request, params }) {
  const updatedObj = { priority: true };

  await updateOrder(params.orderId, updatedObj);

  return null;
}

export default UpdateOrder;