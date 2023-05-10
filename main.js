/**
 * @consultarApi; en esta seccion de scripts se resuelve la logica de trabajar
 * con la api de pokemon
**/

const contenedorPokemon = document.getElementById("contenedorPokemon");
const mochilaPokemon = document.getElementById("mochilaPokemon");
const formularioBusqueda = document.getElementById("formularioBusqueda");
const anteriorPaginacion = document.getElementById("anteriorPaginacion");
const siguientePaginacion = document.getElementById("siguientePaginacion");
let mochila = [];
let anteriorLink = "";
let siguienteLink = "";
let inicio = 0;
let limite = 12;
let url = `https://pokeapi.co/api/v2/pokemon/?offset=${inicio}&limit=${limite}`;

const api = (url) => {
  // pasarle la url x aca
  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      siguienteLink = pokemon.next;
      anteriorLink = pokemon.previous;

      mostrarPokemon(pokemon);
    })
    .catch((error) => console.log(error));
};

const mostrarPokemon = (pokemon) => {
  contenedorPokemon.innerHTML = "";

  pokemon.results.forEach((poke) => {
    fetch(poke.url)
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card mb-3" style="width: 18rem">
              <img src="${result.sprites.front_default}" class="card-img-top" alt="imagen del pokemon ${poke.name}" />
              <div class="card-body">
                <h5 class="card-title">${poke.name}</h5>
                <div class="card-text">
                  <ul>
                    <li>Type: Fire</li>
                    <li>Type: Fire</li>
                    <li>Type: Fire</li>
                    <li>Type: Fire</li>
                  </ul>
                </div>
                <a href="#" class="btn btn-primary w-100" id="capturarPokemon${result.id}"
                  >Capturar Pokemon</a
                >
              </div>
            </div>
          `;
        contenedorPokemon.appendChild(div);

        const capturarPokemonElemento = document.getElementById(
          `capturarPokemon${result.id}`
        );
        capturarPokemonElemento.addEventListener("click", () =>
          pokemonCapturado(result)
        );
      })
      .catch((error) => console.error(error));
  });

};

// pokemon que van dentro de la mochila (maximo 6)
const pokemonCapturado = (result) => {
  // comrpuebo si ese ID existe en mi mochila
  const pokemon = mochila.find((mochi) => mochi.id === result.id);

  // si nmo existe en la mochila lo guardo y solo puedo tener en mi mochila 6 poke
  if (!pokemon && mochila.length < 6) {
    mochila.push(result);

    // renderizo el resultado
    mostrarMochilaPokemon();
    limiteMochila();

  } else if (mochila.length >= 6) {
    Toastify({
      text: "Su mochila esta llena",
      duration: 3000,
      close: true,
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        fontWeight: "900",
      },
    }).showToast();
  }


};

const mostrarMochilaPokemon = () => {
  mochilaPokemon.innerHTML = "";

  mochila.forEach((pokemon) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <img src=${pokemon?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default}>
        <strong class="text-muted">${pokemon?.name}</strong> ❘
        <strong class="text-muted">${pokemon?.name}</strong> ❘
        <strong class="text-muted">${pokemon?.name}</strong>
        <button class="btn btn-danger btn-sm" id="eliminarPokemon${pokemon.id}">Liberar</button>
        <hr>
    `;
    mochilaPokemon.appendChild(div);

    // elimino pokemon por id
    const eliminarPokemonBtn = div.querySelector(
      `#eliminarPokemon${pokemon.id}`
    );
    eliminarPokemonBtn.addEventListener("click", () =>
      eliminarPokemon(pokemon.id)
    );
  });

};

// eliminar pokemon por id
const eliminarPokemon = (id) => {
  // Crea un nuevo array que excluya al pokemon con el id especificado
  const nuevaMochila = mochila.filter((poke) => poke.id !== id);

  // Asigna la nueva mochila a la variable mochila
  mochila = nuevaMochila;

  // Actualiza la vista
  mostrarMochilaPokemon();
  limiteMochila();

};

// cantidad mochila
const limiteMochila = () => {
  const mochilaLink = document.getElementById("limiteMochila");
  let contador = mochila.length;

  contador < 6
    ? (mochilaLink.innerHTML = `(${contador})`)
    : (mochilaLink.innerHTML = `<span style='color:red;'>(${contador})</span>`);
};

const vaciarMochilaButton = document.getElementById('vaciarMochilaButton')
vaciarMochilaButton.addEventListener('click', () => vaciarMochila())
// vaciar mochila
const vaciarMochila = () => {

  if(mochila.length >= 1) {
    Swal.fire({
      title: '¿Realmente quieres liberar a todos tus Pokémon?',
      icon: 'warning',
      confirmButtonText: "Si",
      showCancelButton: true,
    }).then(response => {
  
      if(response.isConfirmed) {
        mochila = []
        mostrarMochilaPokemon()
        limiteMochila()
      }
    })
  } else {
    Toastify({
      text: "Tu mochila esta vacia",
      duration: 3000,
      close: true,
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        fontWeight: "900",
      },
    }).showToast();
  }



};


// buscador
formularioBusqueda.addEventListener("submit", (event) => buscarPokemon(event));

const buscarPokemon = (event) => {
  event.preventDefault();
  const inputBuscar = document.getElementById("inputBuscar");

  let url = `https://pokeapi.co/api/v2/pokemon/${inputBuscar.value}`;

  fetch(url)
    .then((response) => {
      //  console.log('result.status', response.status)
      //  console.log('result.ok', response.ok)

      if (!response.ok || response.status === 404) {
        Swal.fire({
          title: "Error!",
          text: `El Pokemon con el nombre ${inputBuscar.value} no existe`,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      } else {
        return response.json();
      }
    })
    .then((result) => {
      if (inputBuscar.value == "" || inputBuscar.value.length === 0) {
        Toastify({
          text: "Ingrese nombre de pokemon",
          duration: 3000,
          close: true,
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            fontWeight: "900",
          },
        }).showToast();

        mostrarPokemon(result);
      } else {
        contenedorPokemon.innerHTML = `
        <div class="card mx-auto h-100" style="width: 18rem">
        <img src="${result.sprites.front_default}" class="card-img-top h-75" alt="imagen del pokemon ${result.name}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${result.name}</h5>
          <div class="card-text">
            <ul>
              <li>Type: Fire</li>
              <li>Type: Fire</li>
              <li>Type: Fire</li>
              <li>Type: Fire</li>
            </ul>
          </div>
          <a href="javascript:history.back()" class="btn btn-success mt-auto" ">VOLVER</a>
        </div>
      </div>
      `;

        anteriorPaginacion.style.display = "none";
        siguientePaginacion.style.display = "none";
      }
    })
    .catch((error) => console.log(error));
};



// paginacion
anteriorPaginacion.addEventListener("click", () => anterior());
siguientePaginacion.addEventListener("click", () => siguiente());

const anterior = () => {
  api(anteriorLink);
};

const siguiente = () => {
  api(siguienteLink);
};

api(url); // pasarle la url x aca

/**
 * @creadorDePokemon; en esta seccion de scripts se resuelve la logica de crear
 * un pokemon personalizado
**/

