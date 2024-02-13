import { Link } from "react-router-dom";

function Post() {
  return (
    <Link to={"/trend-tide/view-post"}>
      <article className="bg-light rounded-lg flex flex-col gap-y-3 px-4 py-3 cursor-pointer">
        <h2 className="text-sm font-bold">That&apos;s my opinion</h2>
        <span className="text-xs">What the fuck</span>
        <div className="rounded-lg">
          <img
            className="rounded-lg object-cover w-64 h-32"
            src="https://cdn.pixabay.com/photo/2020/07/20/06/42/english-bulldog-5422018_1280.jpg"
          />
        </div>
      </article>
    </Link>
  );
}

export default Post;
