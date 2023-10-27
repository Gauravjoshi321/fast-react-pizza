import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";


  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {loading && <Loader />}
      <Header />

      <main className="overflow-scroll">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  )
}

export default AppLayout;