import Input from "UIElements/Input";
import FilePicker from "UIElements/FilePicker";
import Button from "UIElements/Button";
import useInput from "hooks/useInput";
import { getCredentials } from "util/store";
import { useNavigate } from "react-router-dom";
import { sendRequest, getApiUrl } from "util/request";
import { useRef, useState, useEffect } from "react";
import { POST_TITLE_MAX_LENGTH, POST_CONTENT_MAX_LENGTH } from "util/validator";

function CreatePost() {
  const { inputResponse, validateCommonInput, validateTextArea } = useInput();
  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const [userReturn, setUserReturn] = useState("");

  useEffect(() => {
    if (inputResponse.textarea.isValid || inputResponse.input.isValid) {
      setUserReturn("");
    }
  }, [inputResponse]);

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

      setUserReturn("");
    } else {
      setUserReturn("Please verify fields.");
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

  return (
    <form
      className="flex flex-col flex-1 gap-y-4"
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <div>
        <Input
          type="text"
          placeholder="Title goes here"
          onChange={(e) => {
            validateCommonInput(e.target.value);
          }}
          className={`${inputResponse.input.formState}`}
          name="postTitle"
          id="postTitle"
          maxLength={POST_TITLE_MAX_LENGTH}
        />
        <small>{inputResponse.input.invalidMsg}</small>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col rounded-t rounded-b flex-1 content-between">
          <textarea
            className={`rounded-t px-2 py-3 outline-none resize-none flex-1 ${inputResponse.textarea.formState}`}
            placeholder="Share what you have to say..."
            maxLength={POST_CONTENT_MAX_LENGTH}
            onChange={(e) => {
              validateTextArea(e.target.value);
            }}
            name="postContent"
            id="postContent"
          />
          <div
            className={`rounded-b bg-black flex gap-x-2 items-center justify-center py-6 cursor-pointer hover:opacity-90 h-32`}
          >
            <FilePicker
              imageSize="w-10 h-10"
              ref={filePickerRef}
              canRemoveImage={true}
            />
          </div>
        </div>
        <small>{inputResponse.textarea.invalidMsg}</small>
      </div>
      {userReturn && <div className="bg-black rounded p-4">{userReturn}</div>}
      <div className="flex justify-center">
        <div className="w-1/5">
          <Button type="submit" className="bg-light text-dark">
            Post
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
