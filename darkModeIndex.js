const darkButton = document.getElementById("darkMode-button");
darkButton.addEventListener("click", () => {
  console.log("me dieron click");
  const darkMain = document.getElementById("main");
  darkMain.classList.toggle("dark-main");
  const homeInfo = document.getElementById("home-page__info");
  homeInfo.classList.toggle("homepage-info_dark");
});
