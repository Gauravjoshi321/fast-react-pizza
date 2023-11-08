import { Form, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function UpdateOrder() {
  // const fetcher = useFetcher();

  return (
    <Form method="PATCH" className="text-right mt-4">
      <Button type="small">Make Priority</Button>
    </Form>
  )
}

export const action = function ({ request, params }) {
  console.log('update');

  return null;
}

export default UpdateOrder;