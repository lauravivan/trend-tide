import Input from "UIElements/Input";
import FilePicker from "UIElements/FilePicker";
import FormButton from "UIElements/FormButton";
import useInput from "hooks/useInput";
import { getCredentials } from "util/store";
import { useNavigate } from "react-router-dom";
import { sendRequest, getApiUrl } from "util/request";
import { useRef, useState } from "react";
import IconModel from "@/shared/icons/IconModel";

function CreatePost() {
  const { inputResponse, validateCommonInput, validateTextArea } = useInput();
  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const currentDate = new Date();

    if (inputResponse.input.isValid && inputResponse.textarea.isValid) {
      formData.append("title", inputResponse.input.value);
      formData.append("content", inputResponse.textarea.value);
      formData.append("author", getCredentials().uid);
      formData.append("creationDate", currentDate);

      if (filePickerRef.current) {
        if (filePickerRef.current.files[0]) {
          formData.append("image", filePickerRef.current.files[0]);
        }
      }
    }

    const res = await sendRequest({
      method: "POST",
      url: getApiUrl() + "post/new-post",
      resource: formData,
      isJSON: false,
    });

    if (res.ok) {
      navigate("/trend-tide");
    }
  };

  const handleImageDeletion = () => {
    setImageUrl(null);
  };

  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <div className="flex flex-1 m-auto flex-col content-stretch gap-y-3">
          <Input
            type="text"
            placeholder="Title goes here"
            onChange={(e) => {
              validateCommonInput(e.target.value);
            }}
            className={`${inputResponse.input.state}`}
            name="postTitle"
            id="postTitle"
            maxLength={100}
          />
          <div className={`flex h-full bg-white rounded-lg`}>
            <div
              className={`flex flex-col flex-1 h-full content-between ${inputResponse.textarea.state}`}
            >
              <textarea
                className={`rounded-md px-2 py-3 outline-none w-full resize-none flex-1 ${inputResponse.textarea.state}`}
                placeholder="Share what you have to say..."
                rows={6}
                maxLength={1200}
                onChange={(e) => {
                  validateTextArea(e.target.value);
                }}
                name="postContent"
                id="postContent"
              ></textarea>
              <div
                className={`m-3 bg-gray rounded flex gap-x-2 items-center justify-center py-6 cursor-pointer hover:opacity-90`}
              >
                <FilePicker
                  imageSize="w-10 h-10"
                  ref={filePickerRef}
                  imageUrl={imageUrl}
                />
                <button type="button" onClick={handleImageDeletion}>
                  <IconModel>delete</IconModel>
                </button>
              </div>
            </div>
          </div>
          <FormButton text="Post" />
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
