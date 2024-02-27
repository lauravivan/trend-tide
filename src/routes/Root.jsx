/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";
import { useAuthContext } from "context/authContext";
import { Navigate } from "react-router-dom";
import Input from "UIElements/Input";
import Search from "UIElements/Search";
import { getCredentials } from "util/store";
import IconModel from "@/shared/icons/IconModel";

function AsideItem({ href, iconName }) {
  return (
    <li className="rounded-md text-light hover:bg-light hover:text-dark hover:opacity-85 cursor-pointer">
      <Link to={href}>
        <IconModel fontSize="30px">{iconName}</IconModel>
      </Link>
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
      <div className="flex h-full w-full md:w-[80%] md:h-12/13 md:rounded-lg m-auto bg-dark flex relative">
        <aside className="flex h-full md:h-12/13 bg-dark w-20 md:rounded-l-lg border-r border-r-white fixed">
          <nav className="flex flex-1">
            <ul className="flex flex-1 flex-col text-center my-7 gap-y-10">
              <AsideItem href="/trend-tide/profile" iconName="person" />
              <AsideItem
                href={"/trend-tide/favorite-posts/" + getCredentials().uid}
                iconName="favorite"
              />
              <AsideItem
                href={"/trend-tide/posts/" + getCredentials().uid}
                iconName="speaker_notes"
              />
              <div className="mt-auto">
                <button onClick={signOut}>
                  <AsideItem iconName="logout" />
                </button>
              </div>
            </ul>
          </nav>
        </aside>
        <div className="flex flex-col flex-1 ms-20">
          <header className="bg-dark text-white md:rounded-tr-lg px-4 py-1">
            <nav className="px-3 py-4">
              <ul className="flex flex-col gap-y-3 md:gap-y-0 sm:flex-row sm:justify-between sm:items-center">
                <li>
                  <Link className="font-bold text-lg">Posts</Link>
                </li>
                <li className="w-full md:w-[50%]">
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
          <main className="text-light md:p-10 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Root;
