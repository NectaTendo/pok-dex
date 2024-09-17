const nomePokemonElement = document.getElementById("nome-pokemon");
const imagemPokemon = document.getElementById("imagem-pokemon");
const idPokemonInput = document.getElementById("id-pokemon");
const nomePokemonInput = document.getElementById("nome-pokemon-input");
const botaoBuscarId = document.getElementById("buscar-id");
const botaoBuscarNome = document.getElementById("buscar-nome");

let idPokemonAtual = 1;

// Função para obter os dados de um Pokémon pelo ID ou Nome
async function buscarPokemon(identificador) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificador}`);
    if (!response.ok) {
      throw new Error("Pokémon não encontrado");
    }
    const pokemon = await response.json();
    exibirPokemon(pokemon);
  } catch (error) {
    alert(error.message);
  }
}

// Função para exibir os dados do Pokémon na página
function exibirPokemon(pokemon) {
  nomePokemonElement.textContent = capitalizarPrimeiraLetra(pokemon.name);
  imagemPokemon.src = pokemon.sprites.front_default;
  alterarCorDeFundo(pokemon.types[0].type.name);
}

// Função para mudar o fundo de acordo com o tipo do Pokémon
function alterarCorDeFundo(tipo) {
  const coresPorTipo = {
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "yellow",
    bug: "limegreen",
    rock: "gray",
    ground: "brown",
    poison: "purple",
    dragon: "indigo",
    psychic: "pink",
    default: "white"
  };
  document.body.style.backgroundColor = coresPorTipo[tipo] || coresPorTipo["default"];
}

// Função auxiliar para capitalizar a primeira letra
function capitalizarPrimeiraLetra(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Buscar Pokémon por ID
botaoBuscarId.addEventListener("click", () => {
  const idPokemon = idPokemonInput.value;
  if (idPokemon) {
    buscarPokemon(idPokemon);
  } else {
    alert("Por favor, insira um ID válido.");
  }
});

// Buscar Pokémon por Nome
botaoBuscarNome.addEventListener("click", () => {
  const nomePokemon = nomePokemonInput.value.toLowerCase();
  if (nomePokemon) {
    buscarPokemon(nomePokemon);
  } else {
    alert("Por favor, insira um nome válido.");
  }
});

// Carregar o primeiro Pokémon ao iniciar a página
buscarPokemon(idPokemonAtual);
