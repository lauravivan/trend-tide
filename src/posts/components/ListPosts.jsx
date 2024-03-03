/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { sendRequest, getApiUrl } from "util/request";
import Post from "./Post";
import Return from "UIElements/Return";
import Loading from "UIElements/Loading";
import { getCredentials } from "util/store";

const ListPosts = ({ actionPath, maxLength = 10 }) => {
  const [pageCounter, setPageCounter] = useState(maxLength);
  const [view, setView] = useState("grid");
  const [itemsPerView, setItemsPerView] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [requestRes, setRequestRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + actionPath,
        });

        if (res.ok) {
          const resJSON = await res.json();
          setRequestRes({
            ok: true,
            data: resJSON,
          });
          setTotalPosts(resJSON.length);
        } else {
          const resJSON = await res.json();
          setRequestRes({
            ok: false,
            message: resJSON.message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [actionPath]);

  useEffect(() => {
    if (requestRes && requestRes.ok) {
      const itemsTotal = pageCounter - (pageCounter - totalPosts);
      setItemsPerView(itemsTotal);
    }
  }, [pageCounter, requestRes, totalPosts]);

  const getMoreItems = () => {
    if (requestRes && requestRes.ok) {
      setPageCounter(pageCounter - (totalPosts - maxLength));
    }
  };

  const getLessItems = () => {
    setPageCounter(pageCounter + (pageCounter - maxLength));
  };

  const changeToGrid = () => {
    setView("grid");
  };

  const changeToList = () => {
    setView("list");
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          {requestRes && requestRes.ok && (
            <span>{itemsPerView + " of " + totalPosts}</span>
          )}
        </div>
        <div className={`flex items-center`}>
          <button
            className="border-e flex items-center pr-3"
            type="button"
            onClick={changeToGrid}
          >
            <span
              className="material-icons-outlined p-2 hover:bg-black hover:rounded"
              style={{ fontSize: "30px" }}
              title="Grid"
            >
              apps
            </span>
          </button>
          <button
            className="flex items-center justify-start pl-3"
            type="button"
            onClick={changeToList}
          >
            <span
              className="material-icons-outlined p-2 hover:bg-black hover:rounded"
              style={{ fontSize: "30px" }}
              title="List"
            >
              list
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {requestRes && requestRes.ok && (
          <div
            className={`gap-10 w-full mb-10 ${
              view === "grid" ? "grid custom-grid" : "flex flex-1 flex-col"
            }`}
          >
            {requestRes.data &&
              requestRes.data.map((post, index) => {
                let isFavorite;

                isFavorite = post.usersWhoLiked.find(
                  (favPost) => favPost === getCredentials().uid
                );

                if (index < pageCounter) {
                  return (
                    <div className="flex" key={post._id}>
                      <Post
                        author={post.author.username}
                        title={post.title}
                        content={post.content}
                        imageUrl={post.image.url}
                        creationDate={post.creationDate}
                        pid={post._id}
                        checkFavorite={true}
                        isFavorite={isFavorite || null}
                        qntOfLikes={post.usersWhoLiked.length}
                      />
                    </div>
                  );
                }
              })}
          </div>
        )}

        {requestRes && !requestRes.ok && <Return>{requestRes.message}</Return>}

        {!requestRes && (
          <Return>
            <Loading />
          </Return>
        )}
      </div>

      <div className="mt-10 mb-0">
        {pageCounter < totalPosts && (
          <div className="text-center mt-5 mb-10">
            <button
              className="text-light font-bold"
              type="button"
              onClick={getMoreItems}
            >
              See more...
            </button>
          </div>
        )}

        {pageCounter > maxLength && pageCounter >= totalPosts && (
          <div className="text-center mt-5 mb-10">
            <button
              className="text-light font-bold"
              type="button"
              onClick={getLessItems}
            >
              See less...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPosts;
