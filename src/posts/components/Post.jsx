/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import ImageNotFound from "UIElements/ImageNotFound";
import { useState } from "react";
import { sendRequest, getApiUrl } from "util/request";
import { getCredentials } from "util/store";
import Icon from "UIElements/Icon";

function Post({
  pid,
  title,
  content,
  imageUrl,
  author,
  creationDate,
  checkFavorite = false,
  isFavorite = false,
  qntOfLikes = "",
}) {
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  const [likes, setLikes] = useState(qntOfLikes);

  const handleFavorite = async (e) => {
    e.preventDefault();

    setIsFavorited(!isFavorited);

    const removeUrl = `${getApiUrl()}user/remove-favorite-post/${
      getCredentials().uid
    }/${pid}`;

    const addUrl = `${getApiUrl()}user/add-favorite-post/${
      getCredentials().uid
    }/${pid}`;

    try {
      const res = await sendRequest({
        method: "PATCH",
        url: isFavorited ? removeUrl : addUrl,
        isJSON: false,
      });

      if (res.ok && isFavorited) {
        setLikes((prevLikes) => prevLikes - 1);
      }

      if (res.ok && !isFavorited) {
        setLikes((prevLikes) => prevLikes + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link className="w-full flex" to={"/trend-tide/view-post/" + pid}>
      <article className="w-full bg-light rounded-lg flex flex-1 flex-col gap-y-3 px-4 py-3 cursor-pointer text-dark hover:opacity-95">
        <h2 className="text-md font-bold truncate overflow-hidden">{title}</h2>
        <p className="text-xs truncate overflow-hidden">{content}</p>
        <div className="rounded-lg w-full flex h-40">
          {imageUrl && (
            <img className="rounded-lg object-cover w-full" src={imageUrl} />
          )}
          {!imageUrl && (
            <div className="w-full bg-gray rounded-lg text-light text-center flex items-center">
              <Icon className="w-full" fontSize={"40px"}>
                image
              </Icon>
            </div>
          )}
        </div>
        <footer className="flex justify-between items-center mt-auto">
          {checkFavorite && (
            <button
              type="button"
              onClick={handleFavorite}
              onTouchStart={handleFavorite}
              onTouchEnd={handleFavorite}
            >
              <span>
                <span className="relative">
                  <span className="absolute text-dark bottom-2 -right-3">
                    {likes}
                  </span>
                  {!isFavorited && <Icon>favorite_border</Icon>}
                  {isFavorited && <Icon className="text-red">favorite</Icon>}
                </span>
              </span>
            </button>
          )}
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
