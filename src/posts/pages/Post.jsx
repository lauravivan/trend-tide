import { sendRequest, getApiUrl } from "util/request";
import { useEffect, useState } from "react";
import Image from "UIElements/Image";

function Post() {
  const location = window.location.href;
  const pid = location.split("/")[5];
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({ url: getApiUrl() + "post/" + pid });

        if (res) {
          const info = await res.json();
          setPostInfo(info);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  if (postInfo) {
    return (
      <div className="text-light flex flex-col m-auto h-full w-full p-10 content-evenly">
        <div className="flex flex-col">
          <p>
            Post published by{" "}
            <span className="font-bold uppercase text-pastel-purple">
              {postInfo.author.username}
            </span>
          </p>
          <p>
            Created at{" "}
            <span className="font-bold uppercase text-pastel-orange">
              {postInfo.creationDate}
            </span>
          </p>
          <p>
            Edited at
            <span className="font-bold uppercase text-pastel-orange">
              {postInfo.editDate}
            </span>
          </p>
        </div>
        <div className="mt-10 overflow-hidden h-full">
          <div className="mb-4">
            <h1 className="text-2xl text-wrap break-all">{postInfo.title}</h1>
          </div>
          <div className="bg-light rounded text-dark p-5 flex items-center">
            <div className="flex justify-around gap-x-10 flex-1">
              <p className="text-wrap indent-8 break-all text-sm">
                {postInfo.content}
              </p>
              {postInfo.image && (
                <div className="flex items-center justify-center px-10">
                  <img className="w-20" src={postInfo.image} />
                </div>
              )}
              {!postInfo.image && (
                <div className="flex items-center justify-center px-10">
                  <Image />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>It seems we had some difficults to find the post you want to.</div>
    );
  }
}

export default Post;
