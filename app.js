// Global variables
const cards = [...document.querySelectorAll(".card")]
const result = document.querySelector(".span-result")
let body = document.querySelector("body")
const advice = document.querySelector(".advice")
score = 0
let lockedCard = false
let arrayAttribute = []
saveDuplicate = []
// shuffle card at the beggining of the game
const shuffleCard = () => {
  lockedCard = false
  cards.forEach(card => {
    position = Math.floor(Math.random() * (12 - 1 + 1)) + 1
    card.style.order= position
  });
}
// function to find duplicate in array
const toFindDuplicates = array => array.filter((item, index) => array.indexOf(item) !== index)
// function to exectue when you select a card

const handleClick = (event) => {
  if (lockedCard) return;
  let currentFruitAttribute = event.target.dataset.attr
  // si elemenet a deja class acrive on ne peux pas clicker dessus
  if (!event.target.children[0].classList.contains("active")) {
    console.log("first")
    arrayAttribute.push(currentFruitAttribute)
    console.log(arrayAttribute)
  }
  // show fruit on click
  event.target.children[0].classList.add("active")
  // push the value of the selected fruit into an array that will save the two first value in it



  // when there is two card revealed
  if (arrayAttribute.length == 2) {
    console.log("second")
    lockedCard = true
    let duplicateElements = toFindDuplicates(arrayAttribute);
    if (duplicateElements.length > 0){
      saveDuplicate.push(duplicateElements.join(""))
    }
    setTimeout(() => {
      if (duplicateElements.length < 1) {
        arrayAttribute.forEach(element => {
          cards.forEach(card => {
            if (card.dataset.attr === element){
              card.children[0].classList.remove("active")
            }
          });
        });
      }
      lockedCard = false
      score ++
      result.innerHTML = score
      if (saveDuplicate.length === 6) {
        lockedCard = true
        advice.innerHTML = `congratulation, you win with ${score} try, press escape to retart the game`
        body.style.background = "linear-gradient(to right, #08d158, #03c1ec)";
        document.addEventListener("keydown", restart)
      }
      arrayAttribute = []
    }, 1000);
  }
}

const restart = (event) => {
  let keycode = event.keyCode
  if (keycode === 32) {
    advice.innerHTML = `try to win with less try possible`;
    body.style.background = "linear-gradient(to right, #d17608, #ec3503)";
    score = 0;
    saveDuplicate = [];
    result.innerHTML = score;
    cards.forEach(card => {
      card.children[0].classList.remove("active")
    });
    shuffleCard()
  }
}

// event to listen
cards.forEach(card => {
  card.addEventListener("click", handleClick)
});
window.addEventListener("load", shuffleCard)
