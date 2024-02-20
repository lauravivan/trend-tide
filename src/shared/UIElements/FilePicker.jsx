/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import Spinner from "UIElements/Spinner";
import ImageNotFound from "UIElements/ImageNotFound";

const FilePicker = ({
  onChange,
  previewUrlPromise,
  btnContent,
  isAnother = false,
  btnClassName,
  imageSize,
}) => {
  const fileUploader = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (isAnother) {
      setPreviewUrl(null);
    }
  }, [isAnother]);

  if (previewUrlPromise) {
    previewUrlPromise.then((result) => {
      setPreviewUrl(result);
    });
  }

  const filePickedHandler = () => {
    fileUploader.current.click();
  };

  return (
    <>
      <label htmlFor="upload">
        <input
          type="file"
          className="hidden"
          name="upload"
          accept=".jpg, .png, .jpeg"
          ref={fileUploader}
          onChange={onChange}
        />
      </label>
      <div className="flex justify-center gap-x-3 items-center flex-1 w-full h-full">
        {!isAnother && (
          <div className="flex rounded-full bg-white p-4 text-dark">
            {previewUrl && (
              <>
                <div>
                  <img className={imageSize} src={previewUrl} alt="Preview" />
                </div>
              </>
            )}
            {!previewUrl && <ImageNotFound />}
          </div>
        )}
        {!previewUrl && (
          <>
            <button
              type="button"
              className={`${btnClassName}`}
              onClick={filePickedHandler}
            >
              {btnContent}
            </button>
            {previewUrlPromise && <Spinner />}
          </>
        )}
      </div>
    </>
  );
};

export default FilePicker;
