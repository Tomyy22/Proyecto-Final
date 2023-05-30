//SearchBar

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#searchbar")) {
    document.querySelectorAll(".producto").forEach((elemento) => {
      if (
        elemento.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        elemento.classList.remove("ocultar");
      } else {
        elemento.classList.add("ocultar");
      }
      if (e.target.value === "") {
        elemento.classList.add("ocultar");
      }
    });
  }
});

//Recomendacion

const result = document.querySelector(".result");
const form = document.querySelector(".clima");
const ciudad = document.querySelector("#ciudad");
const pais = document.querySelector("#pais");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (ciudad.value === "" || pais.value === "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }

  llamarAPI(ciudad.value, pais.value);
});

function llamarAPI(city, country) {
  const apiId = "93cfe5049c56cd767444fd72437694a6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod == "404") {
        mostrarError("Ciudad no encontrada");
      } else {
        limpiarHTML();
        mostrarClima(dataJSON);
      }
      console.log(dataJSON);
    })
    .catch((error) => {
      console.log(error);
    });
}

function mostrarClima(data) {
  const {
    name,
    main: { temp },
    weather: [arr],
  } = data;
  const degrees = kelvinToCelsius(temp);

  const content = document.createElement("div");
  content.innerHTML = `
       <h5>Clima en ${name}</h5>
       <h2>${degrees}°</h2>
       <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="info-weather">
   `;

  result.appendChild(content);

  const arr1 = [
    '<a href="./cafe-caliente.html">Cafes Calientes</a>',
    '<a href="./te-caliente.html">Tés Calientes</a>',
  ];
  const arr2 = [
    '<a href="./frappuccino.html">Frappuccinos</a>',
    '<a href="./heladas.html">Bebidas Heladas</a>',
    '<a href="./cafe-helado.html">Cafes Helados</a>',
    '<a href="./te-helado.html">Tés Helados</a>',
  ];
  const img1 = [
    '<a href="./cafe-caliente.html"><img src="../img/cafe-caliente.png"></a>',
    '<a href="./te-caliente.html"><img src="../img/te-caliente.png"></a>',
  ];
  const img2 = [
    '<a href="./frappuccino.html"><img src="../img/frappuccino.png"></a>',
    '<a href="./heladas.html"><img src="../img/heladas.png"></a>',
    '<a href="./cafe-helado.html"><img src="../img/cafe-helado.png"></a>',
    '<a href="./te-helado.html"><img src="../img/te-helado.png"></a>',
  ];

  const random = arr1[Math.floor(Math.random() * arr1.length)];
  const random2 = arr2[Math.floor(Math.random() * arr2.length)];

  const recom = document.querySelector(".recom");

  if (degrees < 20) {
    const ran1 = document.createElement("a");
    if (random === arr1[0]) {
      ran1.innerHTML = `
         ${random}
         ${img1[0]}
        `;
    } else {
      ran1.innerHTML = `
            ${random}
            ${img1[1]}
           `;
    }

    recom.appendChild(ran1);
    setTimeout(() => {
      ran1.remove();
    }, 2000);
  } else {
    const ran2 = document.createElement("a");
    if (random2 === arr2[0]) {
      ran2.innerHTML = `
        ${random2}
        ${img2[0]}   
       `;
    } else if (random2 === arr2[1]) {
      ran2.innerHTML = `
        ${random2}
        ${img2[1]}   
       `;
    } else if (random2 === arr2[2]) {
      ran2.innerHTML = `
        ${random2}
        ${img2[2]}   
       `;
    } else {
      ran2.innerHTML = `
        ${random2}
        ${img2[3]}   
       `;
    }

    recom.appendChild(ran2);
    setTimeout(() => {
      ran2.remove();
    }, 2000);
  }
}

function mostrarError(message) {
  console.log(message);
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;

  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2000);
}

function kelvinToCelsius(temp) {
  return parseInt(temp - 273.15);
}

function limpiarHTML() {
  result.innerHTML = ``;
}
