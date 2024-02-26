import fileReader from "util/file-reader";

const getImageUrl = async () => {
  try {
    const res = await fileReader(pickedFile);

    if (res) {
      setPreviewUrl(res);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getImageUrl;
