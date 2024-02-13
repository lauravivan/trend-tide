import { Button, ButtonWithLink } from "components/Button";
import CatSvg from "svg/Cat";
import { useAuthContext } from "context/authContext";

function Homepage() {
  const { authState } = useAuthContext();

  return (
    <main className="h-screen flex bg-dark">
      <div className="lg:relative h-100 w-100 flex flex-col lg:flex-row flex-1 bg-light rounded lg:my-5 lg:mx-6">
        <div className="flex flex-1 m-auto px-3 sm:px-0">
          <div className="m-auto">
            <div className="flex flex-col gap-y-2 text-center">
              <h1 className="font-black text-4xl md:text-5xl lg:text-8xl transition-fontSize duration-1000 ease-in-out">
                TrendTide
              </h1>
              <h3 className="font-light text-md md:text-lg lg:text-xl">
                A place you can share what you have to say
              </h3>
            </div>
            <div className="flex gap-x-2 mt-10">
              <ButtonWithLink
                type="button"
                text="Get started"
                className="bg-dark text-white"
                href={`${
                  authState.isLoggedIn ? "/trend-tide" : "/account/signin"
                }`}
              />
              <Button type="button" text="More" className="bg-pastel-purple" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 m-auto lg:absolute lg:-bottom-5 lg:right-0">
          <CatSvg className="w-52 sm:w-72 lg:w-64 2xl:w-[30rem] transition-width ease-in-out duration-1000" />
        </div>
      </div>
    </main>
  );
}

export default Homepage;
