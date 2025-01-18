export const imgToBase64 = async (img: File) =>
  new Promise<string | ArrayBuffer>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result!);
  });
