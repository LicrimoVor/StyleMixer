/** Преобразует фото в base64  */
export const imgToBase64 = async (img: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result!);
  });
