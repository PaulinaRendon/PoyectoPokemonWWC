const darkButton = document.getElementById("darkMode-button");
darkButton.addEventListener("click", () => {
  console.log("me dieron click");
  const darkMain = document.getElementById("main");
  darkMain.classList.toggle("dark-main");
  const blogTitle = document.querySelector(".blog-title");
  blogTitle.classList.toggle("blog-title_dark");
  const blogText = document.querySelector(".blog-text");
  blogText.classList.toggle("blog-text_dark");
});
