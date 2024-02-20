import { sendRequest, getApiUrl } from "util/request";
import { useEffect, useState } from "react";
import ImageNotFound from "UIElements/ImageNotFound";
import Request from "components/Request";
import { getCredentials } from "util/store";
import FormButton from "UIElements/FormButton";

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
  }, [pid]);

  return (
    <Request requestRes={requestRes}>
      {requestRes && (
        <>
          <section className="flex items-center justify-between">
            <div className="flex gap-x-5 items-center">
              {requestRes.data.author.profileImage && (
                <div>
                  <img
                    className="w-20 rounded-full"
                    src={requestRes.data.author.profileImage}
                  />
                </div>
              )}

              {!requestRes.data.author.profileImage && (
                <ImageNotFound className="flex items-center rounded-full bg-white text-dark p-7" />
              )}

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

            {requestRes.data.author._id === getCredentials().uid && (
              <div className="flex gap-x-3">
                <FormButton
                  className="bg-green px-3"
                  text="Update"
                ></FormButton>
                <FormButton className="bg-red px-3" text="Delete"></FormButton>
              </div>
            )}
          </section>

          <section className="mt-10">
            <div className="mb-4">
              <h1 className="text-2xl text-wrap break-all">
                {requestRes.data.title}
              </h1>
            </div>
            <div className="bg-light rounded text-dark py-6 px-10 flex flex-col gap-y-5">
              <p className="text-wrap break-all text-md flex-1 text-center">
                {requestRes.data.content}
              </p>

              {requestRes.data.image && (
                <div className="flex justify-center">
                  <img
                    className="rounded-lg object-center"
                    src={requestRes.data.image}
                  />
                </div>
              )}

              {!requestRes.data.image && (
                <ImageNotFound
                  className="w-full h-40 bg-gray rounded-lg text-light flex justify-center items-center"
                  fontSize={"60px"}
                />
              )}
            </div>
          </section>
        </>
      )}
    </Request>
  );
}

export default Post;
