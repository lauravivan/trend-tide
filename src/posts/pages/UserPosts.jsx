import { getCredentials } from "util/store";
import ListPosts from "@/posts/components/ListPosts";

const UserPosts = () => {
  return <ListPosts actionPath={"post/posts/" + getCredentials().uid} />;
};

export default UserPosts;
