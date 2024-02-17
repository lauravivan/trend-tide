import { getCredentials } from "util/store";
import FilePicker from "UIElements/FilePicker";
import useInput from "hooks/useInput";
import FormButton from "UIElements/FormButton";
import EditableInput from "UIElements/EditableInput";
import { useEffect, useState } from "react";
import { sendRequest, getApiUrl } from "util/request";
import RequestMessage from "components/RequestMessage";
import useForm from "hooks/useForm";

const Profile = () => {
  const { inputResponse, validateFile } = useInput();
  const [requestRes, setRequestRes] = useState(null);
  const { handleFormRequest } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "user/account-info/" + getCredentials().uid,
        });

        setRequestRes(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (inputResponse.pickedFile.value) {
      inputResponse.pickedFile.value.then((result) => {
        formData.append("image", result);

        handleFormRequest(
          "PATCH",
          `user/account-update/${requestRes.data._id}`,
          false,
          true,
          formData
        );
      });
    }
  };

  if (requestRes) {
    if (requestRes.status === "success") {
      return (
        <div className="text-light flex flex-col md:flex-row rounded h-full md:my-5 md:mx-3">
          <div className="flex mt-10 md:mt-0 md:flex-1 justify-items-center">
            <div className="m-auto">
              {requestRes.data.profileImage && (
                <img className="w-40" src={requestRes.data.profileImage} />
              )}
            </div>
            {!requestRes.data.profileImage && (
              <div className="flex flex-col gap-y-1 m-auto">
                <div className="flex">
                  <form
                    className="flex flex-col gap-y-5"
                    onSubmit={(e) => handleFileSubmit(e)}
                  >
                    <FilePicker
                      btnContent="Add a profile pic"
                      previewUrlPromise={inputResponse.pickedFile.value}
                      onChange={(e) => validateFile(e)}
                      text=""
                      imageSize="w-20"
                    />
                    {inputResponse.pickedFile.value && (
                      <>
                        <div className="flex gap-x-3 w-64">
                          <FormButton
                            text="Save this"
                            className="flex flex-1 text-xs w-full"
                          />
                          <FilePicker
                            btnContent="Choose another"
                            previewUrlPromise=""
                            onChange={(e) => validateFile(e)}
                            isAnother={true}
                            btnClassName="text-xs bg-light text-dark font-semibold rounded flex flex-1 items-center justify-center py-3 hover:opacity-85"
                          />
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-10 md:flex-1 m-auto">
            <EditableInput
              inputName="username"
              inputValue={requestRes.data.username}
              inputType="text"
              formAction={`user/account-update/${requestRes.data._id}`}
            />
            <EditableInput
              inputName="email"
              inputValue={requestRes.data.email}
              inputType="text"
              formAction={`user/account-update/${requestRes.data._id}`}
            />
            <EditableInput
              inputName="password"
              inputValue={requestRes.data.password}
              inputType="password"
              formAction={`user/account-update/${requestRes.data._id}`}
            />
            <form>
              <FormButton
                text="Delete account"
                className="bg-red text-sm w-2/5"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return <RequestMessage message={requestRes.message} />;
    }
  } else {
    return <RequestMessage isSearching={true} />;
  }
};

export default Profile;
