import ListPosts from "@/posts/components/ListPosts";
import { getCredentials } from "util/store";

function FavoritePosts() {
  return (
    <ListPosts actionPath={"user/favorite-posts/" + getCredentials().uid} />
  );
}

export default FavoritePosts;
