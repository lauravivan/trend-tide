import Post from "@/posts/components/Post";
import { sendRequest, getApiUrl } from "util/request";
import { useEffect, useState } from "react";
import Spinner from "UIElements/Spinner";
import ListItems from "components/ListItems";

function Posts() {
  const [requestHasBeenMade, setRequestHasBeenMade] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setRequestHasBeenMade(true);
      let data = await sendRequest({ url: getApiUrl() + "post/posts" });

      if (data) {
        data = await data.json();
        setPosts(data);
      }
    };

    fetchData();
  }, []);

  if (!requestHasBeenMade) {
    return (
      <div className="text-lg text-white flex m-auto gap-x-4">
        <span>Looking for posts</span>
        <Spinner />
      </div>
    );
  }

  if (requestHasBeenMade && posts) {
    if (posts.length === 0) {
      return (
        <div className="text-lg text-white m-auto">
          <span>No posts have been found </span>
        </div>
      );
    } else {
      return (
        <div className="text-white px-6 py-7 w-full h-full overflow-y-auto overflow-x-hidden">
          <ListItems
            items={posts.map((post) => (
              <div key={post._id}>
                <Post
                  author={post.author.username}
                  title={post.title}
                  content={post.content}
                  imageUrl={post.image}
                  creationDate={post.creationDate}
                  pid={post._id}
                />
              </div>
            ))}
          />
        </div>
      );
    }
  }
}

export default Posts;
