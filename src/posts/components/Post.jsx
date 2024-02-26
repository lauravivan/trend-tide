/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ImageNotFound from "UIElements/ImageNotFound";
import Heart from "UIElements/Heart";
import HeartFavorite from "UIElements/HeartFavorite";
import { useState, useEffect } from "react";
import { sendRequest, getApiUrl } from "util/request";
import { getCredentials } from "util/store";

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

  const handleBtnClick = () => {
    setIsFavorited(!isFavorited);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFavorited) {
      try {
        const res = await sendRequest({
          method: "PATCH",
          url:
            getApiUrl() +
            "user/remove-favorite-post/" +
            getCredentials().uid +
            "/" +
            pid,
          isJSON: false,
        });

        if (res.ok) {
          setLikes((prevLikes) => prevLikes - 1);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await sendRequest({
          method: "PATCH",
          url:
            getApiUrl() +
            "user/add-favorite-post/" +
            getCredentials().uid +
            "/" +
            pid,
          isJSON: false,
        });

        if (res.ok) {
          setLikes((prevLikes) => prevLikes + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Link className="w-full" to={"/trend-tide/view-post/" + pid}>
      <article className="w-full bg-light rounded-lg flex flex-col gap-y-3 px-4 py-3 cursor-pointer text-dark">
        <h2 className="text-md font-bold truncate overflow-hidden">{title}</h2>
        <p className="text-xs truncate overflow-hidden">{content}</p>
        <div className="rounded-lg w-full">
          {imageUrl && (
            <img
              className="rounded-lg object-cover w-full h-40"
              src={imageUrl}
            />
          )}
          {!imageUrl && (
            <ImageNotFound
              className="w-full h-40 bg-gray rounded-lg text-light flex justify-center items-center"
              fontSize={"40px"}
            />
          )}
        </div>
        <footer className="flex justify-between items-center mt-auto">
          {checkFavorite && (
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <button
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBtnClick();
                }}
              >
                <span>
                  <span className="relative">
                    <span className="absolute text-dark bottom-2 -right-3">
                      {likes}
                    </span>
                    {!isFavorited && <Heart />}
                    {isFavorited && <HeartFavorite className="text-red" />}
                  </span>
                </span>
              </button>
            </form>
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
