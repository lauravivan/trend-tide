import { useRouteError } from "react-router-dom";
import Cat from "UIElements/Cat";

const NotFound = () => {
  const error = useRouteError();
  return (
    <main className="h-screen">
      <div className="bg-dark text-white h-full flex">
        <div className="flex m-auto flex-col text-center flex-1 gap-y-3">
          <h1 className="text-3xl font-bold">Oops!</h1>
          <p className="font-semibold">
            We feel sorry for that. An error has ocurred.
          </p>
          <span className="italic">
            <span className="font-bold">{error.status}</span>{" "}
            {error.statusText || error.message}
          </span>
          <div className="flex flex-1 m-auto">
            <Cat className="w-52 sm:w-72 lg:w-64 2xl:w-[30rem] transition-width ease-in-out duration-1000" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
