import { sendRequest, getApiUrl } from "util/request";
import { useState, useEffect } from "react";
import { getCredentials } from "util/store";
import FilePicker from "UIElements/FilePicker";
import useInput from "hooks/useInput";
import FormButton from "UIElements/FormButton";
import EditableInput from "UIElements/EditableInput";

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const { inputResponse, validateFile } = useInput();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          url: getApiUrl() + "user/account-info/" + getCredentials().uid,
        });

        if (response) {
          const responseJson = await response.json();
          setAccountInfo(responseJson);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (accountInfo) {
    return (
      <div className="text-light flex flex-col md:flex-row rounded h-full md:my-5 md:mx-3">
        <div className="flex mt-10 md:mt-0 md:flex-1 justify-items-center">
          <div>
            {accountInfo.profileImage && <img src={accountInfo.profileImage} />}
          </div>
          {!accountInfo.profileImage && (
            <div className="flex flex-col gap-y-1 m-auto">
              <div className="flex">
                <form className="flex flex-col gap-y-5">
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
            inputValue={accountInfo.username}
            inputType="text"
            formAction={`/account-update/${accountInfo._id}`}
          />
          <EditableInput
            inputName="email"
            inputValue={accountInfo.email}
            inputType="text"
            formAction={`/account-update/${accountInfo._id}`}
          />
          <EditableInput
            inputName="password"
            inputValue={accountInfo.password}
            inputType="password"
            formAction={`/account-update/${accountInfo._id}`}
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
  }
};

export default Profile;
