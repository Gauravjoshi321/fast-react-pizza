import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const userName = useSelector(state => state.user.userName);

  return (
    <div className="text-center my-10 sm:my-16 px-4">
      <h1 className="text-xl text-yellow-500 font-semibold mb-6">
        <span className="text-stone-700">The best pizza.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>

      {
        userName === ""
          ? <CreateUser />
          : <Button type="primary" to="/menu">
            Start ordering, {userName}
          </Button>
      }
    </div>
  );
}

export default Home;
