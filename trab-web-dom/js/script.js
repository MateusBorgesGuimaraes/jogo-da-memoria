const card = document.querySelectorAll(".card");
const btnStart = document.querySelector(".btn-start");
const pontuacao = document.querySelector(".tentativas");
const pontos = document.querySelector(".pontos");

let cartasViradas = [];
let bloquearCliques = false;
let jogadorNome;

const pokemonsArray = [
  "bulbasaur",
  "bulbasaur",
  "charmander",
  "charmander",
  "pidgey",
  "pidgey",
  "pikachu",
  "pikachu",
  "squirtle",
  "squirtle",
  "meowth",
  "meowth",
  "vulpix",
  "vulpix",
  "jigglypuff",
  "jigglypuff",
  "psyduck",
  "psyduck",
  "abra",
  "abra",
  "scyther",
  "scyther",
  "eevee",
  "eevee",
];

const numeroPokemon = pokemonsArray.length;

function sortearEremover(array) {
  if (array.length === 0) {
    console.log("A array está vazia.");
    return;
  }
  const indiceSorteado = Math.floor(Math.random() * array.length);
  const elementoSorteado = array.splice(indiceSorteado, 1)[0];

  return elementoSorteado;
}

function obterNomeJogador() {
  jogadorNome = prompt("Digite seu nome:");
  if (!jogadorNome) {
    jogadorNome = "Jogador Anônimo";
  }
}

function iniciarJogo() {
  obterNomeJogador();
  cartasViradas = [];
  btnStart.classList.add("inicio");
  bloquearCliques = false;
  card.forEach(function (item, i) {
    const pokemonSorteado = sortearEremover(pokemonsArray);
    item.classList.add(pokemonSorteado);
    item.addEventListener("click", function () {
      if (!bloquearCliques) {
        virarCarta(item);
      }
    });
  });
}

function virarCarta(cartaClicada) {
  if (cartasViradas.length < 2) {
    if (cartaClicada.classList.contains("fundo2")) {
      cartasViradas.push(cartaClicada);
      cartaClicada.classList.remove("fundo2");
    } else if (cartaClicada.classList.contains("fundo3")) {
      cartasViradas.push(cartaClicada);
      cartaClicada.classList.remove("fundo3");
    }
    if (cartasViradas.length === 2) {
      bloquearCliques = true;
      setTimeout(verificarCompatibilidade, 1000);
    }
  }
}

function jogarNovamente() {
  const jogarNovamente = confirm("Deseja jogar novamente?");
  if (jogarNovamente) {
    location.reload();
  }
}

function verificarCompatibilidade() {
  if (cartasViradas[0].className !== cartasViradas[1].className) {
    cartasViradas.forEach((carta) => {
      setTimeout(() => {
        carta.classList.add("fundo2");
      }, 500);
    });
    pontuacao.innerHTML = parseInt(pontuacao.innerHTML) - 1;
  } else {
    cartasViradas.forEach((carta) => {
      carta.classList.add("find");
    });
    pontos.innerHTML = parseInt(pontos.innerHTML) + 1;
  }
  cartasViradas = [];
  bloquearCliques = false;
  if (parseInt(pontuacao.innerHTML) === 0) {
    pontuacao.innerHTML = `Que pena, ${jogadorNome}. Você PERDEU! Sua pontuação final foi ${parseInt(
      pontos.innerHTML
    )}.`;
    setTimeout(() => {
      jogarNovamente();
    }, 500);
  } else if (parseInt(pontos.innerHTML) === 12) {
    pontos.innerHTML = `Parabéns, ${jogadorNome}! Você GANHOU com ${parseInt(
      pontuacao.innerHTML
    )} tentativas restantes!`;
    setTimeout(() => {
      jogarNovamente();
    }, 500);
  }
}

btnStart.addEventListener("click", iniciarJogo);
