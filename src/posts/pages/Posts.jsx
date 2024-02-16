import Post from "@/posts/components/Post";
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
        <div className="text-white px-6 py-7 w-full h-full overflow-y-auto overflow-x-hidden">
          <ListItems
            items={requestRes.data.map((post) => (
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
    } else {
      return <RequestMessage message={requestRes.message} />;
    }
  } else {
    return <RequestMessage isSearching={true} />;
  }
}

export default Posts;
