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
let limite = 24;
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
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card mb-3" style="width: 18rem">
              <img src="${result.sprites.front_default}" class="card-img-top" alt="imagen del pokemon ${result.name}" />
              <div class="card-body">
                <h5 class="card-title">${result.name}</h5>
                <div class="card-text">
                  <ul>
                    <li><strong class="text-muted">#</strong>${result.id}</li>
                    <li><strong class="text-muted">Type:</strong> ${result.types[0].type.name}</li>
                    <li><strong class="text-muted">Height:</strong> ${result.height}</li>
                    <li><strong class="text-muted">Weight:</strong> ${result.weight}</li>
                  </ul>
                </div>
                <a href="javascript:void(0)" class="btn btn-primary w-100" id="capturarPokemon${result.id}"
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

  // si no existe en la mochila lo guardo y solo puedo tener en mi mochila 6 poke
  if (!pokemon && mochila.length < 6) {
    mochila.push(result);

    // guardo en LS
    localStorage.setItem("mochilaPokemonLS", JSON.stringify(mochila));

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
        background: "linear-gradient(to right, red, #96c93d)",
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
        <strong class="text-muted">#${pokemon?.id}</strong> ❘
        <strong class="text-muted">${pokemon?.name}</strong> ❘
        <strong class="text-muted">${pokemon?.types[0].type.name}</strong> 
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

const verificarMochilaVacia = () => {
  if (mochila.length === 0) {
    mochilaPokemon.innerHTML =
      "!Mochila vacía. Ve a capturar Pokemon. Recuerda que tienes 6 Pokebolas disponibles!";
  }
};

// eliminar pokemon por id
const eliminarPokemon = (id) => {
  // crea un nuevo array que excluya al pokemon con el id especificado
  const nuevaMochila = mochila.filter((poke) => poke.id !== id);

  // asigna la nueva mochila a la variable mochila
  mochila = nuevaMochila;

  // convierto a string la mochila para guardar la actualizacion de la misma en el LS
  let actualizoMochilaLS = JSON.stringify(mochila);

  // guardo los valores actualizados en el LS
  localStorage.setItem("mochilaPokemonLS", actualizoMochilaLS);

  // renders
  mostrarMochilaPokemon();
  limiteMochila();
  verificarMochilaVacia();
};

// cantidad mochila
const limiteMochila = () => {
  const mochilaLink = document.getElementById("limiteMochila");
  let contador = mochila.length;

  contador < 6
    ? (mochilaLink.innerHTML = `(${contador})`)
    : (mochilaLink.innerHTML = `<span style='color:red;'>(${contador})</span>`);
};

const vaciarMochilaButton = document.getElementById("vaciarMochilaButton");
vaciarMochilaButton.addEventListener("click", () => vaciarMochila());

// vaciar mochila
const vaciarMochila = () => {
  if (mochila.length >= 1) {
    Swal.fire({
      title: "¿Realmente quieres liberar a todos tus Pokémon?",
      icon: "warning",
      confirmButtonText: "Si",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        mochila = [];
        localStorage.removeItem('mochilaPokemonLS'); // vacio los datos almacenados en LS
        mostrarMochilaPokemon();
        limiteMochila();
        verificarMochilaVacia();
      }
    });
  } else {
    Toastify({
      text: "Tu mochila ya esta vacia",
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
            background: "linear-gradient(to right, red, #96c93d)",
            fontWeight: "900",
          },
        }).showToast();

        mostrarPokemon(result);
      } else {
        contenedorPokemon.innerHTML = `
        <div class="card mx-auto w-100">
          <div class="d-flex mx-auto">
            <img src="${result.sprites.other.home.front_default}" class="card-img-top" alt="imagen del pokemon ${result.name}" />
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${result.name}</h5>
            <div class="card-text">
              <ul>
                <li><strong class="text-muted">#</strong>${result.id}</li>
                <li><strong class="text-muted">Type:</strong> ${result.types[0].type.name}</li>
                <li><strong class="text-muted">Height:</strong> ${result.height}</li>
                <li><strong class="text-muted">Weight:</strong> ${result.weight}</li>
              </ul>
            </div>
            <a href="javascript:history.back()" class="btn btn-success mt-auto">VOLVER</a>
          </div>
        </div>`;

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

// LS mochila, compruebo si hay un objeto almacenado en el "localStorage" con la clave "mochilaPokemon".
if (localStorage.getItem("mochilaPokemonLS")) {
  mochila = JSON.parse(localStorage.getItem("mochilaPokemonLS"));
  mostrarMochilaPokemon();
  limiteMochila();
}

api(url);

/**
 * @creadorDePokemon; en esta seccion de scripts se resuelve la logica de crear
 * un pokeamigo personalizado
 **/

// traigo las etiquetas
const formularioCreador = document.getElementById("formularioCreador");
const nombreCreador = document.getElementById("nombre");
const tipoCreador = document.getElementById("tipo");
const imagenCreador = document.getElementById("imagen");

// class
class PokemonCreador {
  constructor(nombre, tipo, imagen = "./img/imagen_predefinida.jpg") {
    this.id = parseInt(`${Math.floor(Math.random() * 1000) + 1}${Date.now()}`);
    this.nombre = nombre;
    this.tipo = tipo;
    this.imagen = imagen;
  }
}

let pokemonCreado = [];

// instnacion y creo pokemon dinamico
formularioCreador.addEventListener("submit", (e) => crearPokemon(e));

const crearPokemon = (e) => {
  e.preventDefault();

  // valido campos vacios
  if (
    nombreCreador.value == "" ||
    tipoCreador.value == "" ||
    imagenCreador.value == ""
  ) {
    Toastify({
      text: "Debe rellenar todos los campos",
      duration: 3000,
      close: true,
      className: "info",
      style: {
        background: "linear-gradient(to right, red, #96c93d)",
        fontWeight: "900",
      },
    }).showToast();
  } else {
    const pokemonNuevo = new PokemonCreador(
      nombreCreador.value,
      tipoCreador.value,
      imagenCreador.value
    );

    // agregar el nuevo Pokémon
    pokemonCreado.push(pokemonNuevo);

    // guardo en LS
    localStorage.setItem("creadorPokemonLS", JSON.stringify(pokemonCreado));

    // reiniciar el formulario
    formularioCreador.reset();

    // render
    tusCreaciones();

    // cierro modal automaticamente una vez creado el pokeamigo
    const creadorModal = document.getElementById("creadorModal");
    const modal = bootstrap.Modal.getInstance(creadorModal);
    modal.hide();
  }
};

// muestro los pokemon creados en 'tus creaciones'
const listarPokeAmigos = document.getElementById("listarPokeAmigos");

const tusCreaciones = () => {
  if (pokemonCreado.length <= 6) {
    listarPokeAmigos.innerHTML = "";

    pokemonCreado.forEach((pokemon) => {
      const div = document.createElement("div");

      // valido que la img que no venga vacia, si no le doy x default una (mejorar logica)
      let img = pokemon.imagen.includes("https")
        ? pokemon.imagen
        : "./img/imagen_predefinida.jpg";

      div.innerHTML += `
        <div class="mb-3">
          <img src="${img}" alt="${pokemon.nombre}" style="width: 5rem; height: 5rem;" /> | 
          <strong class="text-muted">${pokemon.tipo}</strong> | 
          <strong class="text-muted">${pokemon.nombre}</strong>
          <button data-bs-toggle="modal" class="btn btn-primary" data-bs-target="#editarModal" id="editarPokeAmigoBtn${pokemon.id}">Editar</button>
          <button class="btn btn-danger" id="liberarPokeAmigoBtn${pokemon.id}">Liberar</button>
        </div>`;
      listarPokeAmigos.appendChild(div);

      // liberar pokeamigo
      const liberarPokeAmigoBtn = document.getElementById(
        `liberarPokeAmigoBtn${pokemon.id}`
      );
      liberarPokeAmigoBtn.addEventListener("click", () =>
        liberarPokeAmigo(pokemon.id)
      );

      // editar pokeamigo
      const editarPokeAmigoBtn = document.getElementById(
        `editarPokeAmigoBtn${pokemon.id}`
      );
      editarPokeAmigoBtn.addEventListener("click", () =>
        editarPokeAmigo(pokemon.id)
      );
    });

    limiteCreacion();
  } else {
    Toastify({
      text: "Solo puedes crear hasta 6 PokeAmigos",
      duration: 3000,
      close: true,
      className: "info",
      style: {
        background: "linear-gradient(to right, red, #96c93d)",
        fontWeight: "900",
      },
    }).showToast();
  }
};

// limitar cantidad de creacion
const limiteCreacion = () => {
  const limiteCreacionMochila = document.getElementById(
    "limiteCreacionMochila"
  );
  let contador = pokemonCreado.length;

  contador < 6
    ? (limiteCreacionMochila.innerHTML = `(${contador})`)
    : (limiteCreacionMochila.innerHTML = `<span style='color:red;'>(${contador})</span>`);
};

// libierar pokeamigo
const liberarPokeAmigo = (id) => {
  let liberar = pokemonCreado.filter((pokemon) => pokemon.id !== id);
  pokemonCreado = liberar;

  // convierto a string la pokemonCreado para guardar la actualizacion de la misma en el LS
  let actualizoCreadorLS = JSON.stringify(pokemonCreado);

  // guardo los valores actualizados en el LS
  localStorage.setItem("creadorPokemonLS", actualizoCreadorLS);

  //render
  tusCreaciones();
  verificarCreadorVacio();
};

// vaciar creador
const vaciarCreadorButton = document.getElementById("vaciarCreadorButton");
vaciarCreadorButton.addEventListener("click", () => vaciarCreador());

const vaciarCreador = () => {
  if (pokemonCreado.length >= 1) {
    Swal.fire({
      title: "¿Realmente quieres liberar a todas tus creaciones?",
      icon: "warning",
      confirmButtonText: "Si",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        pokemonCreado = [];
        localStorage.removeItem('creadorPokemonLS'); // vacio los datos almacenados en LS
        limiteCreacion();
        verificarCreadorVacio();
      }
    });
  } else {
    Toastify({
      text: "Tu creador ya esta vacio",
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

// editar pokemon amigo
const editarPokeAmigo = (id) => {
  // busco por ID
  const editar = pokemonCreado.find((pokemon) => pokemon.id === id);

  const formularioEditor = document.getElementById("formularioEditor");
  formularioEditor.innerHTML = "";

  // crear inputs dinamicos
  const divModal = document.createElement("div");
  divModal.innerHTML = `
    <div class="form-group mb-3">
      <input
        type="text"
        class="form-control"
        id="nombre${editar.nombre}"
        value="${editar.nombre}"
        placeholder="Nombre"
      />
    </div>
    <div class="form-group mb-3">
      <input
        type="text"
        class="form-control"
        id="tipo${editar.tipo}" 
        value="${editar.tipo}"
        placeholder="Tipo"
      />
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        id="imagen${editar.imagen}" 
        value="${editar.imagen}"
        placeholder="Imagen"
      />
    </div>
      <div class="form-group mb-3">
      <button
        type="button"
        class="btn btn-primary w-100"
        data-bs-dismiss="modal"
        id="editarPokeAmigoBtn"
      >
        Editar
      </button>
    </div>
  `;
  formularioEditor.appendChild(divModal);

  // obtenido ese id, edito el resultado correspondiente
  const nombreEdit = document.getElementById(`nombre${editar.nombre}`);
  const tipoEdit = document.getElementById(`tipo${editar.tipo}`);
  const imagenEdit = document.getElementById(`imagen${editar.imagen}`);

  formularioEditor.addEventListener("click", () => {
    // valido campos vacios
    if (
      nombreEdit.value.length == 0 ||
      tipoEdit.value.length == 0 ||
      imagenEdit.value.length == 0
    ) {
      Toastify({
        text: "Debe rellenar todos los campos",
        duration: 3000,
        close: true,
        className: "info",
        style: {
          background: "linear-gradient(to right, red, #96c93d)",
          fontWeight: "900",
        },
      }).showToast();
    } else {
      const index = pokemonCreado.find((pokemon) => pokemon.id === id);

      // actualizo las props del obj
      index.nombre = nombreEdit.value;
      index.tipo = tipoEdit.value;
      index.imagen = imagenEdit.value;

      // convierto a string la pokemonCreado para guardar la actualizacion de la misma en el LS
      let actualizoCreadorEditarLS = JSON.stringify(pokemonCreado); 

      // guardo los valores actualizados en el LS
      localStorage.setItem("creadorPokemonLS", actualizoCreadorEditarLS);

      // render
      tusCreaciones();
    }
  });
};

const verificarCreadorVacio = () => {
  if (pokemonCreado.length === 0) {
    listarPokeAmigos.innerHTML =
      "!Creador vacío. Ve al creador. Recuerda que puedes crear 6 PokeAmigos!";
  }
};

// LS para creador, compruebo si hay un objeto almacenado en el "localStorage" con la clave "creadorPokemon".
if (localStorage.getItem("creadorPokemonLS")) {
  pokemonCreado = JSON.parse(localStorage.getItem("creadorPokemonLS"));
}

// renders
const inicializador = () => {
  tusCreaciones();
  verificarMochilaVacia();
  verificarCreadorVacio();
};

inicializador();
