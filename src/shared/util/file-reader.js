const fileReader = (pickedFile) => {
  return new Promise((resolve, reject) => {
    if (!pickedFile) {
      reject(new Error("No file picked"));
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(pickedFile);
  });
};

export default fileReader;
