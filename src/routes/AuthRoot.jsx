import { useAuthContext } from "context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import Cat from "UIElements/Cat";

function AuthRoot() {
  const { authState } = useAuthContext();

  if (authState.isLoggedIn) {
    return <Navigate to="/trend-tide" replace={true} />;
  }

  return (
    <main className="h-screen flex bg-light">
      <div className="sm:min-w-[28rem] md:min-w-[35rem] py-8 px-4 flex items-center flex-1 sm:flex-none sm:m-auto bg-dark text-white sm:rounded transition-spacing transition-flex ease-in-out duration-1000 sm:px-8 lg:w-2/5">
        <section className="relative flex-1">
          <article className="">
            <Outlet />
          </article>
          <Cat className="w-20 absolute -top-16 right-0" />
        </section>
      </div>
    </main>
  );
}

export default AuthRoot;
