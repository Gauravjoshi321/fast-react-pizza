import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right mt-6">
      <Button type="small">Make Priority</Button>
    </fetcher.Form>
  )
}

export default UpdateOrder;