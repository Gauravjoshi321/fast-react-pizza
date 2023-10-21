import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation)
  const loading = navigation.state === "loading";


  return (
    <div className="layout">
      {loading && <Loader />}
      <Header />

      <Outlet />

      <CartOverview />
    </div>
  )
}

export default AppLayout;