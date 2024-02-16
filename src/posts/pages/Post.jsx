import { sendRequest, getApiUrl } from "util/request";
import { useEffect, useState } from "react";
import Image from "UIElements/Image";
import RequestMessage from "components/RequestMessage";

function Post() {
  const location = window.location.href;
  const pid = location.split("/")[5];
  const [requestRes, setRequestRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "post/" + pid,
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
        <div className="text-light flex flex-col m-auto h-full w-full p-10 content-evenly">
          <div className="flex">
            <div>
              <img
                className="rounded-full p-2 w-20"
                src={requestRes.data.author.profileImage}
              />
            </div>
            <div className="flex flex-col">
              <p>
                Post published by{" "}
                <span className="font-bold uppercase text-pastel-purple">
                  {requestRes.data.author.username}
                </span>
              </p>
              <p>
                Created at{" "}
                <span className="font-bold uppercase text-pastel-orange">
                  {requestRes.data.creationDate}
                </span>
              </p>
              <p>
                Edited at{" "}
                <span className="font-bold uppercase text-pastel-orange">
                  {requestRes.data.editDate}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-10 overflow-hidden h-full">
            <div className="mb-4">
              <h1 className="text-2xl text-wrap break-all">
                {requestRes.data.title}
              </h1>
            </div>
            <div className="bg-light rounded text-dark p-5 flex items-center">
              <div className="flex flex-col md:flex-row gap-y-10 text-center md:gap-x-10 md:gap-y-0 md:justify-around flex-1">
                <p className="text-wrap md:indent-8 break-all text-sm">
                  {requestRes.data.content}
                </p>
                {requestRes.data.image && (
                  <div className="flex items-center justify-center px-10">
                    <img className="w-20" src={requestRes.data.image} />
                  </div>
                )}
                {!requestRes.data.image && (
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
      return <RequestMessage message={requestRes.message} />;
    }
  } else {
    return <RequestMessage isSearching={true} />;
  }
}

export default Post;
