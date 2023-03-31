var toggle = document.getElementById("darkMode-button");
var main = document.querySelector("main");
var homeInfo = document.getElementById("home-page__info");
var cardsTitle = document.getElementById("cards-title_dark");
var cardsAll = document.getElementById("cards-all");

toggle.onclick = function () {
  toggle.classList.toggle("active");
  main.classList.toggle("active");
  homeInfo.classList.toggle("active");
  cardsTitle.classList.toggle("active");
  cardsAll.classList.toggle("active");
};
