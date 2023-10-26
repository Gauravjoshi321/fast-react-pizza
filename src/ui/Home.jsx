import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="text-center my-10">
      <h1 className="text-xl text-yellow-500 font-semibold mb-6">
        <span className="text-stone-700">The best pizza.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
