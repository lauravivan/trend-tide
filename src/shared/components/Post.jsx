/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Image from "UIElements/Image";
import Heart from "UIElements/Heart";
import HeartFavorite from "UIElements/HeartFavorite";
import { useState, useRef, useEffect, useCallback } from "react";
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
  const [updateQntOfLikes, setUpdateQntOfLikes] = useState(qntOfLikes);

  useEffect(() => {
    if (qntOfLikes !== updateQntOfLikes) {
      setUpdateQntOfLikes(qntOfLikes);
    }
  }, [qntOfLikes, updateQntOfLikes]);

  const handleBtnClick = () => {
    setIsFavorited(!isFavorited);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFavorite) {
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
        console.log(res);
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
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                      {updateQntOfLikes}
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
