import ListPosts from "@/posts/components/ListPosts";
import { getCredentials } from "util/store";

function FavoritePosts() {
  return (
    <ListPosts actionPath={"post/favorite-posts/" + getCredentials().uid} />
  );
}

export default FavoritePosts;
