//No posts have been published yet! Publish your first post by going on *Create new Post*

import { sendRequest, getApiUrl } from "util/request";
import { useEffect, useState } from "react";
import { getCredentials } from "util/store";
import ListItems from "components/ListItems";
import RequestMessage from "components/RequestMessage";
import Post from "components/Post";

const UserPosts = () => {
  const [requestRes, setRequestRes] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "user/posts/" + getCredentials().uid,
        });

        setRequestRes(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (requestRes) {
    {
      requestRes.data.posts.map((item, index) => {
        console.log(item, index);
      });
    }
  }

  if (requestRes) {
    if (requestRes.status === "success") {
      return (
        <ListItems
          items={requestRes.data.posts.map((post) => (
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
      );
    } else {
      return <RequestMessage message={requestRes.message} />;
    }
  } else {
    return <RequestMessage isSearching={true} />;
  }
};

export default UserPosts;
