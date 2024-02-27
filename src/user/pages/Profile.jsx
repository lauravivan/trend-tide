import { getCredentials } from "util/store";
import FilePicker from "UIElements/FilePicker";
import Button from "UIElements/Button";
import EditableInput from "UIElements/EditableInput";
import { useEffect, useState, useRef } from "react";
import { sendRequest, getApiUrl } from "util/request";
import DeleteButton from "UIElements/DeleteButton";
import Loading from "UIElements/Loading";
import Icon from "UIElements/Icon";
import Return from "UIElements/Return";
import { useAuthContext } from "context/authContext";

const Profile = () => {
  const [requestRes, setRequestRes] = useState(null);
  const filePickerRef = useRef(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const delBtnRef = useRef(null);
  const { signOut } = useAuthContext();

  useEffect(() => {
    if (delBtnRef.current) {
      delBtnRef.current.addEventListener("click", handleAccountDeletion);

      return () => {
        delBtnRef.current.removeEventListener("click", handleAccountDeletion);
      };
    }

    if (filePickerRef.current) {
      filePickerRef.current.addEventListener("change", handleFileChange);

      return () => {
        filePickerRef.current.removeEventListener("change", handleFileChange);
      };
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest({
          url: getApiUrl() + "user/account-info/" + getCredentials().uid,
        });

        const jsonRes = await res.json();

        if (res.ok) {
          setRequestRes({
            ok: true,
            data: jsonRes,
          });

          if (jsonRes.profileImage) {
            setDeleteMode(true);
          }
        } else {
          setRequestRes({
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

  const handleFileSubmission = async () => {
    setWaitingResponse(true);

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
        setEditMode(false);
        setDeleteMode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileDeletion = async () => {
    setWaitingResponse(true);

    try {
      const res = await sendRequest({
        method: "DELETE",
        url: getApiUrl() + "user/delete-profile-pic/" + getCredentials().uid,
      });

      if (res.ok) {
        setWaitingResponse(false);
        setDeleteMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = () => {
    setTimeout(() => {
      if (filePickerRef.current.className.includes("valid")) {
        setEditMode(true);
      } else {
        setEditMode(false);
      }
    }, 100);
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

  if (requestRes) {
    if (requestRes.ok) {
      return (
        <section className="text-light flex flex-col gap-y-12 md:gap-x-10 md:flex-row rounded md:my-5 md:mx-3">
          <div className="flex flex-col mt-10 md:mt-0 md:flex-1 justify-items-center">
            <div className="flex flex-col gap-y-1 md:m-auto">
              <FilePicker
                imageSize="w-52 h-52"
                imageUrl={requestRes.data.profileImage.url || null}
                ref={filePickerRef}
              ></FilePicker>

              {editMode && (
                <Button
                  type="submit"
                  className="bg-light text-dark"
                  onClick={handleFileSubmission}
                >
                  Choose this
                </Button>
              )}

              {deleteMode && (
                <button
                  className="text-center mt-4"
                  onClick={handleFileDeletion}
                >
                  <Icon title="Delete">delete</Icon>
                </button>
              )}

              {waitingResponse && (
                <div className="text-center mt-4">
                  <Loading></Loading>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-10 mx-4 md:flex-1 md:m-auto">
            <EditableInput
              inputName="username"
              inputValue={requestRes.data.username}
              inputType="text"
              formAction={`user/account-update/${requestRes.data._id}`}
              inputMaxLength={50}
            />
            <EditableInput
              inputName="email"
              inputValue={requestRes.data.email}
              inputType="text"
              formAction={`user/account-update/${requestRes.data._id}`}
              inputMaxLength={50}
            />
            <EditableInput
              inputName="password"
              inputValue={requestRes.data.password}
              inputType="password"
              formAction={`user/account-update/${requestRes.data._id}`}
              inputMaxLength={50}
            />
            <DeleteButton ref={delBtnRef}>Delete account</DeleteButton>
          </div>
        </section>
      );
    } else {
      return <Return>{requestRes.message}</Return>;
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
