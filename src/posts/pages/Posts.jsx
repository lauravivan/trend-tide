import Post from "components/Post";
import { useEffect, useState } from "react";
import ListItems from "components/ListItems";
import { sendRequest, getApiUrl } from "util/request";
import RequestMessage from "components/RequestMessage";

function Posts() {
  const [requestRes, setRequestRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "post/posts",
        });

        setRequestRes(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (requestRes) {
    if (requestRes.status === "success") {
      return (
        <ListItems
          items={requestRes.data.map((post) => {
            const isFavorite = post.author.favoritePosts.find(
              (favPost) => favPost._id === post._id
            );

            if (isFavorite) {
              return (
                <div key={post._id}>
                  <Post
                    author={post.author.username}
                    title={post.title}
                    content={post.content}
                    imageUrl={post.image}
                    creationDate={post.creationDate}
                    pid={post._id}
                    checkFavorite={true}
                    isFavorite={true}
                    qntOfLikes={post.usersWhoLiked.length}
                  />
                </div>
              );
            } else {
              return (
                <div key={post._id}>
                  <Post
                    author={post.author.username}
                    title={post.title}
                    content={post.content}
                    imageUrl={post.image}
                    creationDate={post.creationDate}
                    pid={post._id}
                    checkFavorite={true}
                    isFavorite={false}
                    qntOfLikes={post.usersWhoLiked.length}
                  />
                </div>
              );
            }
          })}
        />
      );
    } else {
      return <RequestMessage message={requestRes.message} />;
    }
  } else {
    return <RequestMessage isSearching={true} />;
  }
}

export default Posts;
