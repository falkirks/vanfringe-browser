export const showLoadingScreen = (document) => {
  let img = document.createElement("img");
  img.id = "loadingSpinner";
  img.src = "boot.loading.gif";

  let src = document.getElementById("app");
  src.appendChild(img);
};

export const hideLoadingScreen = (document) => {
  document.getElementById("loadingSpinner").outerHTML = "";
};
