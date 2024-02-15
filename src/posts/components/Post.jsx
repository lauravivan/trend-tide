/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Image from "UIElements/Image";

function Post({ pid, title, content, imageUrl, author, creationDate }) {
  return (
    <Link className="w-full" to={"/trend-tide/view-post/" + pid}>
      <article className="w-full bg-light rounded-lg flex flex-col gap-y-3 px-4 py-3 cursor-pointer overflow-hidden text-dark">
        <h2 className="text-md font-bold truncate text-wrap w-64">{title}</h2>
        <p className="text-xs truncate text-wrap w-64">{content}</p>
        <div className="rounded-lg w-full">
          {imageUrl && (
            <img
              className="rounded-lg object-cover w-full h-32"
              src={imageUrl}
            />
          )}
          {!imageUrl && (
            <div className="w-full h-32 bg-gray rounded-lg text-light flex justify-center items-center">
              <Image fontSize={"40px"} />
            </div>
          )}
        </div>
        <footer className="flex justify-between items-center">
          <span className="uppercase font-bold">{author}</span>
          <span className="text-xs font-semibold">
            {creationDate.substr(0, 10)}
          </span>
        </footer>
      </article>
    </Link>
  );
}

export default Post;
