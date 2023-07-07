const darkButton = document.getElementById("darkMode-button");
darkButton.addEventListener("click", () => {
  console.log("me dieron click");
  const darkMain = document.getElementById("main");
  darkMain.classList.toggle("dark-main");
  const cardsInfo = document.getElementById("cards-title");
  cardsInfo.classList.toggle("cards-title_dark");
});

const dropdownMenu = document.querySelector(".dropdown-menu");

let fetchTypes = true;
const modal = document.getElementById("pokemon-modal");
const closemodal = document.querySelector(".close");
closemodal.onclick = () => {
  modal.style.display = "none";
  cleanUpModal();
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    cleanUpModal();
  }
};
const cleanUpModal = () => {
  const modalPokeContainer = document.querySelector(".pokemon-container");
  modalPokeContainer.remove();
};

const primaryApiUrl = "https://pokeapi.co/api/v2/pokemon";
let nextPokemonsUrl = "";

const createPokeNodes = (element, pokeData) => {
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
  const pokemonImage = document.createElement("img");
  pokemonImage.classList.add("pokemon-image");
  pokemonImage.src = pokeData.sprites.other["official-artwork"].front_default;
  characterCard.appendChild(pokemonImage);
  const cardAction = document.createElement("div");
  cardAction.classList.add("card-action");
  const pokemonLevel = document.createElement("p");
  pokemonLevel.innerText = `Base experience: ${pokeData.base_experience}`;
  const buyButton = document.createElement("button");
  buyButton.classList.add("buy-button");
  buyButton.innerText = "Buy";
  buyButton.onclick = () => {
    populateModal(pokeData);
    modal.style.display = "block";
  };
  buyButton.addEventListener("change", () => {
    const modal = document.getElementById("pokemon-modal");
    modal.forEach((pokeModal) => pokeModal.remove());
  });
  cardAction.appendChild(pokemonLevel);
  cardAction.appendChild(buyButton);
  characterCard.appendChild(cardAction);
};

const populateModal = (pokeData) => {
  const modalPokeContainer = document.createElement("div");
  modalPokeContainer.classList.add("pokemon-container");
  const modalContent = document.querySelector(".modal-content");
  const modalName = document.createElement("h1");
  modalName.classList.add("modal-name");
  const modalImgInfo = document.createElement("div");
  modalImgInfo.classList.add("modal-img-info");
  const modalPokeImage = document.createElement("img");
  modalPokeImage.classList.add("modal-poke-image");
  const modalDetailedInfo = document.createElement("div");
  modalDetailedInfo.classList.add("modal-detailed-info");
  modalImgInfo.appendChild(modalPokeImage);
  modalImgInfo.appendChild(modalDetailedInfo);
  modalPokeContainer.appendChild(modalName);
  modalPokeContainer.appendChild(modalImgInfo);
  modalContent.appendChild(modalPokeContainer);
  modalName.innerText = pokeData.name;
  modalPokeImage.src = pokeData.sprites.other["official-artwork"].front_default;
  modalDetailedInfo.innerText = `Base experience: ${pokeData.base_experience}, 
  Height: ${pokeData.height} decimetres, 
  Weight: ${pokeData.weight} hectograms, 
  Order: ${pokeData.order},  
  Abilities: ${pokeData.abilities.map(
    (pokeAbility) => pokeAbility.ability.name
  )}, 
  Main move: ${pokeData.moves[0].move.name}, 
  Types: ${pokeData.types.map((pokeType) => pokeType.type.name)}`;
};

/* A createPokemon se le agrego un condicional que va a estar pendiente dle tipo de pokemon que se seleccione en el dropdown, cuando viene All el condicional es "ignorado" ya que no entra y se pintan todos los pokemones y cuando es diferente de All, un tipo específico se itera por todos los pokemons y a cada pokemon se le valida si es de ese tipo seleccionado en el dropdown, si lo es,   */

const createPokemon = async (data, type = "All") => {
  data.results.forEach(async (element) => {
    const response = await fetch(element.url);
    const pokeData = await response.json();

    if (type && type === "All") {
      createPokeNodes(element, pokeData);
    } else {
      const pokemonType = pokeData.types.find(
        (option) => option.type.name === type
      );
      if (pokemonType !== undefined) {
        createPokeNodes(element, pokeData);
      }
    }
  });
};

const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const onLoadMore = async () => {
  console.log("hola soy un boton y me hicieron click");
  console.log(nextPokemonsUrl);
  const data = await fetchData(nextPokemonsUrl);
  createPokemon(data);
  nextPokemonsUrl = data.next; /* Recordar: por qué aquí también  */
};

/* funcion getPokemonType es para trer la lista de tipos
desde esa URL y poder llenar la lista dinamicamente sin tener que hardcodear */

/* fetchTypes inicializa en true cuando inicia el programa y cuando se trae los datos por primera vez esa "bandera" como ya se tienen no se tienen que pedir mas, por eso en la funcion de getpokemontype esta como false orden ejecucion, pokemonApiFetch bandera esta nen verdadero y tae los tipos de pokemon, al traerla, se pone la bandera en falso para que no vuelva a traer más tipos de pokemones */

const getPokemonType = async () => {
  fetchTypes = false;
  const types = await fetchData("https://pokeapi.co/api/v2/type");
  const all = document.createElement("option");
  all.innerText = "All";
  dropdownMenu.appendChild(all);
  types.results.forEach((type) => {
    const typeOption = document.createElement("option");
    typeOption.innerText = type.name;
    typeOption.value = type.name;
    dropdownMenu.appendChild(typeOption);
  });
};
/* pokemonApifetch en este caso recibe otro parámetro llamado type que se utiliza cuando ya se ha seleccionado un valor en el dropdown, por eso es opcional y se lo pasa a la funcion createPokemon */

const pokemonApiFetch = async (primaryApiUrl, type) => {
  try {
    if (fetchTypes) {
      await getPokemonType();
    }
    const data = await fetchData(primaryApiUrl);
    nextPokemonsUrl = data.next;
    createPokemon(data, type);
    /* pokemonType(); */
  } catch (error) {
    console.error(error);
  }
};

/* filteredPokemonType le agrega un addevent listener a un elemento del DOM con id que es pokemon-types y escucha cambios en ese elemento, es decir, el change, y lo otro es que cuando escucha un cambio borra todos las tarjetas, los elementos del dom que tienen la clase character-card y lo tercero es que vuelve a inicializar el llamado a la API pero pasándole el valor seleccionado en el dropdown */

const filteredPokemonType = () => {
  const select = document.getElementById("pokemon-types");
  select.addEventListener("change", () => {
    const cards = document.querySelectorAll(".character_card");
    cards.forEach((card) => card.remove());
    pokemonApiFetch(primaryApiUrl, select.value);
  });
};

filteredPokemonType();

pokemonApiFetch(primaryApiUrl);

/* const moreCards = document.querySelector(".more-cards_button");


moreCards.addEventListener("click", onLoadMore); */
