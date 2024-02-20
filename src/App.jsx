import {
  createBrowserRouter as createRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense } from "react";
import Homepage from "@/pages/Homepage";
import NotFound from "@/pages/404";
import AuthRoot from "@/routes/AuthRoot";
import SignUp from "@/user/pages/SignUp";
import SignIn from "@/user/pages/SignIn";
import RecoverPass from "@/user/pages/RecoverPass";
import Profile from "@/user/pages/Profile";
import Root from "@/routes/Root";
import Posts from "@/posts/pages/Posts";
import CreatePost from "@/posts/pages/CreatePost";
import Post from "@/posts/pages/Post";
import UserPosts from "@/posts/pages/UserPosts";
import FavoritePosts from "@/posts/pages/FavoritePosts";
import AuthProvider from "components/AuthProvider";
import { StrictMode } from "react";

const router = createRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFound />,
  },
  {
    path: "/account",
    element: <AuthRoot />,
    children: [
      {
        path: "/account/signup",
        element: <SignUp />,
      },
      {
        path: "/account/signin",
        element: <SignIn />,
      },
      {
        path: "/account/recoverpass",
        element: <RecoverPass />,
      },
    ],
  },
  {
    path: "/trend-tide",
    element: <Root />,
    children: [
      {
        path: "/trend-tide",
        element: <Posts />,
      },
      {
        path: "/trend-tide/new-post",
        element: <CreatePost />,
      },
      {
        path: "/trend-tide/profile",
        element: <Profile />,
      },
      {
        path: "/trend-tide/view-post/:pid",
        element: <Post />,
      },
      {
        path: "/trend-tide/posts/:uid",
        element: <UserPosts />,
      },
      {
        path: "/trend-tide/favorite-posts/:uid",
        element: <FavoritePosts />,
      },
    ],
  },
]);

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
