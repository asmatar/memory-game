// Global variables
const cards = [...document.querySelectorAll(".card")]
const result = document.querySelector(".span-result")
let body = document.querySelector("body")
const advice = document.querySelector(".advice")
const activeCards = [...document.querySelectorAll(".double-face")]
score = 0
let lockedCard = false
let arrayAttribute = []

// shuffle card at the beggining of the game
const shuffleCard = () => {

  lockedCard = false
  cards.forEach(card => {
    position = Math.floor(Math.random() * (12 - 1 + 1)) + 1
    card.style.order = position
  });

}

const flipCard = (event) => {

  if (lockedCard) return;
  let currentFruitAttribute = event.target.dataset.attr
  event.target.children[0].classList.add("active")
  saveCard(event.target.children[0], currentFruitAttribute)
  if (arrayAttribute.length == 2) verif()

}

const saveCard = (card, value) => {
  
  if (card === arrayAttribute[0]?.card) return 
  arrayAttribute.push({card, value})

}

const verif = () => {

  saveScore()
  lockedCard = true
  
  if (arrayAttribute[0].value === arrayAttribute[1].value) {
    arrayAttribute[0].card.parentElement.removeEventListener("click", flipCard)
    arrayAttribute[1].card.parentElement.removeEventListener("click", flipCard)
    arrayAttribute = [] 
    lockedCard = false
  } else {
    setTimeout(() => { 
      arrayAttribute[0].card.classList.remove("active")
      arrayAttribute[1].card.classList.remove("active")
      arrayAttribute = []
      lockedCard = false
    }, 1000)
  }

}

const saveScore = () => {

  score ++
  result.innerHTML = score
  checkForEnd()

}

const checkForEnd = () => {

  const NoActiveCard = activeCards.filter(card => !card.classList.contains("active"))
  if (NoActiveCard.length <1 ) endGame()

}

const endGame = () => {

  advice.innerHTML = `congratulation, you win with ${score} try, press escape to retart the game`
  body.style.background = "linear-gradient(to right, #08d158, #03c1ec)";
  document.addEventListener("keydown", restart)

}

const restart = (event) => {

  let keycode = event.keyCode
  if (keycode === 32) {
    advice.innerHTML = `try to win with less try possible`;
    body.style.background = "linear-gradient(to right, #d17608, #ec3503)";
    score = 0;
    result.innerHTML = score;
    cards.forEach(card => {
      card.children[0].classList.remove("active")
    });
    shuffleCard()
  }

}

cards.forEach(card => {card.addEventListener("click", flipCard)});
window.addEventListener("load", shuffleCard)
