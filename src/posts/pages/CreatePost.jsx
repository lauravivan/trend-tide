import Input from "UIElements/Input";
import FilePicker from "UIElements/FilePicker";
import FormButton from "UIElements/FormButton";
import useInput from "hooks/useInput";
import useForm from "hooks/useForm";
import { getCredentials } from "util/store";
import { UploadIcon } from "icons/Icon";

function CreatePost() {
  const { inputResponse, validateFile, validateCommonInput, validateTextArea } =
    useInput();
  const { formResponse, handleFormRequest } = useForm(
    "POST",
    "post/new-post",
    false
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const currentDate = new Date();

    if (inputResponse.pickedFile.value) {
      inputResponse.pickedFile.value.then((result) => {
        if (inputResponse.input.isValid && inputResponse.textarea.isValid) {
          formData.append("title", inputResponse.input.value);
          formData.append("content", inputResponse.textarea.value);
          formData.append("author", getCredentials().uid);
          formData.append("creationDate", currentDate);
          formData.append("image", result);

          handleFormRequest(true, formData);
        }
      });
    } else {
      if (inputResponse.input.isValid && inputResponse.textarea.isValid) {
        formData.append("title", inputResponse.input.value);
        formData.append("content", inputResponse.textarea.value);
        formData.append("author", getCredentials().uid);
        formData.append("creationDate", currentDate);

        handleFormRequest(true, formData);
      }
    }
  };

  return (
    <div className="w-full h-full p-5">
      <form
        className="flex h-full"
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <div className="flex flex-1 m-auto flex-col content-stretch gap-y-3 h-full">
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
              {formResponse.message && <div>{formResponse.message}</div>}
              <div
                className={`m-3 bg-gray rounded text-center py-6 cursor-pointer hover:opacity-90`}
              >
                <FilePicker
                  onChange={(e) => {
                    validateFile(e);
                  }}
                  previewUrlPromise={inputResponse.pickedFile.value}
                  btnContent={<UploadIcon fontSize="25px" />}
                  btnClassName="bg-dark rounded-full text-white cursor-pointer py-2 px-3"
                  imageSize="w-10"
                />
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
