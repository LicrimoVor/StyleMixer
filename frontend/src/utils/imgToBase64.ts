const convertToBase64 = async (img: File | Blob) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reader.onload = () => resolve(reader.result);
  });

type ImgToBase64 = (image: File | string) => Promise<string>;

/** Преобразует фото в base64  */
export const imgToBase64: ImgToBase64 = (image: File | string) => {
  if (typeof image === "string")
    return fetch(image)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => convertToBase64(blob));

  return convertToBase64(image);
};
