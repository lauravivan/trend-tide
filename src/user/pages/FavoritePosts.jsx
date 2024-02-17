import Post from "components/Post";
import { useEffect, useState } from "react";
import ListItems from "components/ListItems";
import { sendRequest, getApiUrl } from "util/request";
import RequestMessage from "components/RequestMessage";
import { getCredentials } from "util/store";

function FavoritePosts() {
  const [requestRes, setRequestRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "user/favorite-posts/" + getCredentials().uid,
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
          items={requestRes.data.favoritePosts.map((post) => (
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
          ))}
        />
      );
    } else {
      return <RequestMessage message={requestRes.message} />;
    }
  } else {
    return <RequestMessage isSearching={true} />;
  }
}

export default FavoritePosts;
