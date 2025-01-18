export const openImage = (src: string) => {
  const img = new Image();
  img.src = src;
  const w = window.open(src);
  if (w) {
    w.document.write(img.outerHTML);
    w.document.body.style.backgroundColor = "#0C1214";
    w.document.body.style.display = "flex";
    w.document.body.style.alignItems = "center";
    w.document.body.style.justifyContent = "center";
  }
};
