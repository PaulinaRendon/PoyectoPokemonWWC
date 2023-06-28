const dropdownButton = document.querySelector(".dropdown-button");
const dropdownMenu = document.querySelector(".dropdown-menu");
const toggleArrow = document.querySelector(".arrow");

const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

const primaryApiUrl = "https://pokeapi.co/api/v2/pokemon";
let nextPokemonsUrl = "";
/* let pokemonTypeUrl = ""; */

const createPokemon = async (data) => {
  data.results.forEach(async (element) => {
    const cardContainer = document.querySelector(".cards-container");
    const characterCard = document.createElement("div");
    characterCard.classList.add("character_card");
    const cardName = document.createElement("div");
    cardName.classList.add("card-name");
    const pokemonName = document.createElement("p");
    pokemonName.innerText = element.name;
    const heartIcon = document.createElement("img");
    heartIcon.setAttribute("src", "./assets/heart.png");
    cardName.appendChild(pokemonName);
    cardName.appendChild(heartIcon);
    characterCard.appendChild(cardName);
    cardContainer.appendChild(characterCard);
    const response = await fetch(element.url);
    const pokeData = await response.json();
    const pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemon-image");
    pokemonImage.src = pokeData.sprites.other["official-artwork"].front_default;
    characterCard.appendChild(pokemonImage);
    const cardAction = document.createElement("div");
    cardAction.classList.add("card-action");
    const pokemonLevel = document.createElement("p");
    pokemonLevel.innerText = `Power level: ${pokeData.base_experience}`;
    const buyButton = document.createElement("button");
    buyButton.classList.add("buy-button");
    buyButton.innerText = "Buy";
    cardAction.appendChild(pokemonLevel);
    cardAction.appendChild(buyButton);
    characterCard.appendChild(cardAction);
  });
};

const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const onLoadMore = async () => {
  /* console.log("hola soy un boton y me hicieron click");
  console.log(nextPokemonsUrl); */
  const data = await fetchData(nextPokemonsUrl);
  createPokemon(data);
  nextPokemonsUrl = data.next; /* Recordar: por qué aquí también  */
};

const pokemonType = async () => {
  console.log("me dieron click");
  const data = await fetchData(element);
  createPokemon(data);
  /* pokemonTypeUrl = data.types.type.name; */
  const filteredPokemonType = data.filter(
    (data) => data.types.type.name === "grass"
  );
  console.log(filteredPokemonType);
};

const pokemonApiFetch = async (primaryApiUrl) => {
  try {
    const data = await fetchData(primaryApiUrl);
    nextPokemonsUrl = data.next;
    console.log(data);
    createPokemon(data);
  } catch (error) {
    console.error(error);
  }
};

pokemonApiFetch(primaryApiUrl);

/* TODO: Poner filtro buscar con .filter para filtrar los tipos de pokemon (normal, fighting, flying, poison, ground, rock... etc) */
/* TODO: al darle buy que se despliegue la info individual de cada pokemon */
/* TODO: Leer sobre local storage y session storage */
/* TODO: paginar  */
/* TODO: dark mode, menu hamburguesa BUSCAR EN CODE PEN */

/* const moreCards = document.querySelector(".more-cards_button");


moreCards.addEventListener("click", onLoadMore); */
