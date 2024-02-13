import { UploadIcon } from "@/assets/img/material-icons/Icon";

function CreatePost() {
  return (
    <div className="mx-5 my-4">
      <form action="/trend-tide" method="post">
        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            className="rounded-lg py-2 px-3 placeholder:font-bold outline-none"
            placeholder="Title goes here"
          />
          <div className="flex flex-col bg-white rounded-lg">
            <textarea
              className="rounded-lg py-4 px-3 outline-none"
              placeholder="Share what you have to say..."
              rows={6}
            ></textarea>
            <div className="m-3 bg-gray rounded text-center py-10 cursor-pointer hover:opacity-90">
              <input type="file" className="hidden" name="upload" />
              <label
                htmlFor="upload"
                className="bg-dark rounded-full text-white cursor-pointer p-3"
              >
                <UploadIcon fontSize="30px" />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <button
            type="submit"
            className="bg-light rounded-lg outline-none px-6 py-2 font-bold"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
