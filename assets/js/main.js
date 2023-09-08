const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}" data-pokemon='${JSON.stringify(pokemon)}'>
          </div>
        </li>
      `)
      .join('');
    pokemonList.innerHTML += newHtml;

    // Adicione um ouvinte de eventos para cada imagem
    const pokemonImages = document.querySelectorAll('#pokemonList img');
    pokemonImages.forEach((img) => {
      img.addEventListener('click', (event) => {
        const pokemonData = JSON.parse(event.target.getAttribute('data-pokemon'));
        mostrarModal(pokemonData);
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  debugger;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function mostrarModal(pokemon) {
  // Obtém o elemento do modal
  var modal = document.getElementById('modal');

  // Define o conteúdo do modal
  modal.innerHTML = `
    <h1>Detalhes do Pokemon</h1>
    <p>Nome: ${pokemon.name}</p>
    <p>Tipo: ${pokemon.types.join(', ')}</p>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
  `;

  // Mostra o modal
  modal.style.display = 'block';
}

// Seu código JavaScript existente

// Adicione um ouvinte de eventos para o botão de fechar modal
const closeModalButton = document.getElementById('closeModalButton');
const modal = document.getElementById('modal');

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});