import Post from "@/posts/components/Post";

function Posts() {
  return (
    <div className="flex flex-wrap py-3 px-6">
      <div className="flex flex-1 m-auto">
        <Post />
      </div>
    </div>
  );
}

//No posts have been published yet! Publish your first post by going on *Create new Post*

export default Posts;
