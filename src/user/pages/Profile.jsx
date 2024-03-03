import { getCredentials } from "util/store";
import FilePicker from "UIElements/FilePicker";
import EditableInput from "UIElements/EditableInput";
import { useEffect, useState, useRef } from "react";
import { sendRequest, getApiUrl } from "util/request";
import DeleteButton from "UIElements/DeleteButton";
import Loading from "UIElements/Loading";
import Icon from "UIElements/Icon";
import Return from "UIElements/Return";
import { useAuthContext } from "context/authContext";
import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "util/validator";

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const filePickerRef = useRef(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const delBtnRef = useRef(null);
  const { signOut } = useAuthContext();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "user/account-info/" + getCredentials().uid,
        });

        const jsonRes = await res.json();

        if (res.ok) {
          setAccountInfo({
            ok: true,
            data: jsonRes,
          });

          if (jsonRes.profileImage) {
            setDeleteMode(true);
            setImageUrl(jsonRes.profileImage.url);
          }
        } else {
          setAccountInfo({
            ok: false,
            message: jsonRes.message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFileDeletion = async () => {
    setWaitingResponse(true);
    setDeleteMode(false);

    try {
      const res = await sendRequest({
        method: "DELETE",
        url: getApiUrl() + "user/delete-profile-pic/" + getCredentials().uid,
      });

      if (res.ok) {
        setWaitingResponse(false);
        setImageUrl(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleFilePickerChange = async () => {
      setWaitingResponse(true);
      setDeleteMode(false);

      const formData = new FormData();

      formData.append("image", filePickerRef.current.files[0]);

      try {
        const res = await sendRequest({
          method: "PATCH",
          url: getApiUrl() + `user/account-update/${getCredentials().uid}`,
          isJSON: false,
          resource: formData,
        });

        if (res.ok) {
          setWaitingResponse(false);
          setDeleteMode(true);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const res = await sendRequest({
          url: getApiUrl() + "user/account-info/" + getCredentials().uid,
        });

        if (res.ok) {
          const resJSON = await res.json();

          setImageUrl(resJSON.profileImage.url);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleAccountDeletion = async () => {
      try {
        const res = await sendRequest({
          method: "DELETE",
          url: getApiUrl() + `user/delete-account/${getCredentials().uid}`,
        });

        if (res.ok) {
          signOut();
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (filePickerRef.current) {
      filePickerRef.current.addEventListener("change", handleFilePickerChange);
    }

    if (delBtnRef.current) {
      delBtnRef.current.addEventListener("click", handleAccountDeletion);
    }
  });

  if (accountInfo) {
    if (accountInfo.ok) {
      return (
        <div className="flex-1 m-auto flex flex-col gap-x-10 gap-y-10 md:flex-row">
          <div className="flex flex-col gap-y-1 m-auto">
            {imageUrl && (
              <FilePicker
                imageSize="w-52 h-52"
                imageUrl={imageUrl}
                ref={filePickerRef}
              ></FilePicker>
            )}

            {!imageUrl && (
              <FilePicker
                imageSize="w-52 h-52"
                imageUrl={imageUrl}
                ref={filePickerRef}
              ></FilePicker>
            )}

            {deleteMode && (
              <button className="text-center mt-4" onClick={handleFileDeletion}>
                <Icon title="Delete">delete</Icon>
              </button>
            )}

            {waitingResponse && (
              <div className="text-center mt-4">
                <Loading></Loading>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 mb-10 md:mb-0">
            <div className="mb-8">
              <EditableInput
                inputName="username"
                inputPlaceholder={accountInfo.data.username}
                inputType="text"
                inputMaxLength={USERNAME_MAX_LENGTH}
                formAction={`user/account-update/${accountInfo.data._id}`}
              />
            </div>
            <div className="mb-8">
              <EditableInput
                inputName="email"
                inputPlaceholder={accountInfo.data.email}
                inputType="text"
                inputMaxLength={EMAIL_MAX_LENGTH}
                formAction={`user/account-update/${accountInfo.data._id}`}
              />
            </div>
            <div className="mb-8">
              <EditableInput
                inputName="password"
                inputType="password"
                inputMaxLength={PASSWORD_MAX_LENGTH}
                formAction={`user/account-update/${accountInfo.data._id}`}
              />
            </div>
            <DeleteButton className="flex-1" ref={delBtnRef}>
              Delete account
            </DeleteButton>
          </div>
        </div>
      );
    } else {
      return <Return>{accountInfo.message}</Return>;
    }
  } else {
    return (
      <Return>
        <Loading />
      </Return>
    );
  }
};

export default Profile;
