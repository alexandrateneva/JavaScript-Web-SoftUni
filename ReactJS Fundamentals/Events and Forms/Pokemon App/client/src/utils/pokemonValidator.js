let validationFunc = (
  name,
  image,
  info
) => {
  let validName = (() => {
    if (name !== '' && name.length > 0 && name.length < 10) {
      return true;
    }
    return false;
  })();

  let validImage = (() => {
    let imageRegex = new RegExp(/^http(s?):\/\/(.*)\.(jpg|gif|png)$/);
    let testImage = imageRegex.test(image);
    if (testImage && image !== '') {
      return true;
    }
    return false;
  })();

  let validInfo = (() => {
    if (info !== '' && info.length > 0 && info.length < 10) {
      return true;
    }
    return false;
  })();

  return {
    validName,
    validImage,
    validInfo
  };
};

export default validationFunc;
