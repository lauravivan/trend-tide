/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";
import {
  PersonIcon,
  FavoriteIcon,
  LogoutIcon,
  PersonalPostsIcon,
} from "icons/Icon";
import { useAuthContext } from "context/authContext";
import { Navigate } from "react-router-dom";
import Input from "UIElements/Input";
import Search from "UIElements/Search";

function AsideItem({ children }) {
  return (
    <li className="rounded-md text-light hover:bg-light hover:text-dark hover:opacity-85 py-3 cursor-pointer">
      {children}
    </li>
  );
}

function Root() {
  const { authState, signOut } = useAuthContext();

  if (!authState.isLoggedIn) {
    return <Navigate to="/account/signin" replace={true} />;
  }

  return (
    <div className="h-screen bg-light flex">
      <div className="w-full h-full md:w-4/5 md:h-12/13 md:rounded-lg m-auto bg-dark flex">
        <div className="flex h-full w-full md:rounded-lg">
          <aside className="bg-dark w-20 md:rounded-l-lg border-r border-r-white">
            <nav className="flex h-full">
              <ul className="flex flex-1 h-full flex-col text-center py-3 px-2 gap-y-7">
                <AsideItem>
                  <Link to={"/trend-tide/profile"}>
                    <PersonIcon fontSize="30px" />
                  </Link>
                </AsideItem>
                <AsideItem>
                  <Link>
                    <FavoriteIcon fontSize="30px" />
                  </Link>
                </AsideItem>
                <AsideItem>
                  <Link>
                    <PersonalPostsIcon fontSize="30px" />
                  </Link>
                </AsideItem>
                <div className="mt-auto">
                  <AsideItem>
                    <Link>
                      <button
                        onClick={() => {
                          signOut();
                        }}
                      >
                        <LogoutIcon fontSize="30px" />
                      </button>
                    </Link>
                  </AsideItem>
                </div>
              </ul>
            </nav>
          </aside>
          <main className="flex flex-col h-full w-full">
            <header className="bg-dark text-white md:rounded-tr-lg px-4 py-1">
              <nav className="px-3 py-4">
                <ul className="flex flex-col gap-y-3 md:gap-y-0 sm:flex-row sm:justify-between sm:items-center">
                  <li>
                    <Link className="font-bold text-lg">Posts</Link>
                  </li>
                  <li className="w-[50%]">
                    <form>
                      <div className="flex bg-light rounded-lg items-center">
                        <Input placeholder="Search..." className="text-dark" />
                        <Search className="mr-3" />
                      </div>
                    </form>
                  </li>
                  <li>
                    <Link
                      className="rounded-lg block bg-light text-black py-2 px-1 text-center md:px-4"
                      to={"/trend-tide/new-post"}
                    >
                      Create new post
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Root;
