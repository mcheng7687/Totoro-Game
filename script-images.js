/*
By Melvin Cheng
9/6/2021
*/

const gameContainer = document.getElementById("game");
let choose = 0;
let otherCard;
let wait = false;
let score = 0;
let body = document.querySelector("body");
let cardsLeft;


const IMAGES = [
{num: 1, location: "https://image.emojipng.com/806/1324806.jpg"},
{num: 2, location: "https://www.clipartmax.com/png/middle/101-1018863_chu-totoro-by-million-mons-project-blue-totoro-png.png"},
{num: 3, location: "https://sketchok.com/images/articles/06-anime/033-ghibli/03/09.jpg"},
{num: 4, location: "https://i.pinimg.com/236x/a7/68/25/a76825e6707cb48f022d8e01f3899664--cats-bus-hayao-miyazaki.jpg"},
{num: 5, location: "https://m.media-amazon.com/images/I/61IjNvsvDBL.jpg"},
{num: 1, location: "https://image.emojipng.com/806/1324806.jpg"},
{num: 2, location: "https://www.clipartmax.com/png/middle/101-1018863_chu-totoro-by-million-mons-project-blue-totoro-png.png"},
{num: 3, location: "https://sketchok.com/images/articles/06-anime/033-ghibli/03/09.jpg"},
{num: 4, location: "https://i.pinimg.com/236x/a7/68/25/a76825e6707cb48f022d8e01f3899664--cats-bus-hayao-miyazaki.jpg"},
{num: 5, location: "https://m.media-amazon.com/images/I/61IjNvsvDBL.jpg"}
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledImages = shuffle(IMAGES);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createIMGs(array) {
  for (let image of array) {
    // create a new div
    const newDiv = document.createElement("div");
    const photo = document.createElement("img");

    photo.src = image.location;
    photo.style.height = "100%";
    photo.style.width = "100%";
    photo.style.visibility="hidden";

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(image.num);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    newDiv.append(photo);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target.className);
  //console.log(score);

  let thisCard = event.target;

  if (!wait && thisCard!==otherCard) {

    thisCard.firstChild.style.visibility = "visible";
    choose++;

    if (choose == 1) {
      otherCard = thisCard;
    } 
    else if (choose == 2 && otherCard.className === thisCard.className) {
      choose = 0;
      score++;
      cardsLeft -= 2;
      if (cardsLeft <= 0) {
        gameOver();
      }
    }
    else {
      wait = true;
      setTimeout(function () {
      otherCard.firstChild.style.visibility = 'hidden';
      thisCard.firstChild.style.visibility = 'hidden';
      choose = 0;
      score++;
      wait = false;
      },1000);
    }
  }

}

// when the DOM loads
start();

function start () {
  let startButton = document.createElement("button");
  startButton.innerText="START";

  startButton.addEventListener("click",function () {
    body.removeChild(startButton);
    createIMGs(shuffledImages);
    score = 0;
    cardsLeft = shuffledImages.length;
  })

  body.appendChild(startButton);
}

function gameOver () {

  let newElement = document.createElement("h2");
  newElement.style.fontSize = "large";

  let topScore = parseInt(localStorage.getItem("best"));
  if (!topScore || score<=topScore) {
    newElement.innerText = `You won in ${score} tries. That's the best score yet.`;
    localStorage.setItem("best",score);
  } 
  else {
    newElement.innerText = `You won in ${score} tries. Unfortunately, the best score is ${topScore}.`;
  }

  let restartButton = document.createElement("button");
  restartButton.innerText="RESTART";
  restartButton.addEventListener("click",function () {
    gameContainer.innerHTML = "";
    body.removeChild(newElement);
    body.removeChild(restartButton);
    start();
  });

  body.appendChild(newElement);
  body.appendChild(restartButton);
}
