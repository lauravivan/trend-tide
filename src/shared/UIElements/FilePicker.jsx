/* eslint-disable react/prop-types */
import { useState, forwardRef } from "react";
import Icon from "UIElements/Icon";
import fileReader from "util/fileReader";

const FilePicker = forwardRef(function FilePicker(
  { imageSize, imageUrl, canRemoveImage = false },
  fileUploader
) {
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const [invalidFileMsg, setInvalidFileMsg] = useState("");

  const filePickHandler = () => {
    if (fileUploader) {
      fileUploader.current.click();
    }
  };

  //2,51 MB

  const filePickedHandler = async () => {
    let pickedFile;
    let files;
    const typesAccepted = ["gif", "svg+xml", "jpeg", "jpg", "png"];

    if (fileUploader) {
      files = fileUploader.current.files;
    }

    if (files && files.length === 1) {
      pickedFile = files[0];
      const pickedFileType = pickedFile.type.split("/")[1];
      const isFileTypeValid = typesAccepted.includes(pickedFileType);

      if (!isFileTypeValid) {
        pickedFile = null;
      }
    }

    if (pickedFile) {
      try {
        const res = await fileReader(pickedFile);
        if (res) {
          setPreviewUrl(res);
          setInvalidFileMsg("");
          fileUploader.current.classList.add("valid");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setPreviewUrl(null);
      setInvalidFileMsg(
        `The file you're trying to upload is invalid. Types accepted: .gif, .svg, .jpeg, .jpg and .png`
      );
      fileUploader.current.classList.remove("valid");
    }
  };

  const handleImageRemove = () => {
    setPreviewUrl(null);
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        name="upload"
        id="upload"
        accept=".jpg, .png, .jpeg, .gif, .svg"
        ref={fileUploader}
        onChange={filePickedHandler}
      />
      <button
        className={`flex items-center justify-center rounded-full bg-white text-dark ${imageSize}`}
        type="button"
        onClick={filePickHandler}
      >
        {previewUrl && (
          <img
            className={`w-full h-full rounded-full`}
            src={previewUrl}
            alt="Preview"
          />
        )}
        {!previewUrl && <Icon className="py-2">image</Icon>}
      </button>
      {canRemoveImage && previewUrl && (
        <button type="button" onClick={handleImageRemove}>
          <Icon className="text-dark">delete</Icon>
        </button>
      )}
      {invalidFileMsg && (
        <small className="text-center mt-2">{invalidFileMsg}</small>
      )}
    </>
  );
});

export default FilePicker;
