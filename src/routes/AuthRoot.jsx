import { useAuthContext } from "context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import Cat from "UIElements/Cat";

function AuthRoot() {
  const { authState } = useAuthContext();

  if (authState.isLoggedIn) {
    return <Navigate to="/trend-tide" replace={true} />;
  }

  return (
    <main className="h-screen flex">
      <div className="bg-light flex flex-1">
        <div className="sm:min-w-[28rem] md:min-w-[35rem] py-8 px-4 flex-1 sm:flex-none m-auto bg-dark text-white rounded transition-spacing transition-flex ease-in-out duration-1000 sm:px-8 lg:w-2/5">
          <section className="relative">
            <article>
              <Outlet />
            </article>
            <Cat className="w-20 absolute -top-16 right-0" />
          </section>
        </div>
      </div>
    </main>
  );
}

export default AuthRoot;
