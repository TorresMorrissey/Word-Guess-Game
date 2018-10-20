alert("Click NONE.");

var words = ["Sonder"];

var currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

var guessesLeft = 6;
document.getElementById("guesses-left").innerHTML = guessesLeft;

var wins = 0;
document.getElementById("wins").innerHTML = wins;

var resetLettersGuessed = "";

var progressWord = [];

var mysteryWord = [];
var i;

console.log("Current word is: " + currentWord);

for (i = 0; i < currentWord.length; i++) {
  progressWord.push("_");
}
document.getElementById("word-guess").innerHTML = progressWord.join(" ");

function letterInWord(letter) {
  var positions = new Array();
  for (i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) positions.push(i);
  }
  return positions;
}

function lettersToGuess() {
  var i;
  var toGess = 0;
  for (i in progressWord) {
    if (progressWord[i] === "__") toGess++;
  }
  return toGess;
}

document.onkeyup = function(event) {
  var letter = event.key;
  var lettersGuessed = letter.toLocaleUpperCase();
  var i;

  console.log("You have typed a letter: ".concat(letter));

  var positions = letterInWord(lettersGuessed);

  if (positions.length) {
    console.log("User has pressed a letter from word: " + letter);

    for (i = 0; i < positions.length; i++) {
      progressWord[positions[i]] = lettersGuessed;
    }

    document.getElementById("word-guess").innerHTML = progressWord.join(" ");
  } else {
    document.getElementById("letters-guessed").innerHTML +=
      lettersGuessed + " ";

    guessesLeft--;
    document.getElementById("guesses-left").innerHTML = guessesLeft;
  }

  if (guessesLeft === 0) {
    alert(
      "Game Over! You finished with a streak of " +
        wins +
        " wins! The word was " +
        currentWord
    );
    location.reload();
  }

  if (lettersToGuess() == 0) {
    var phrases = ["Congrats, now Google it. SONDER"];
    var nextRound = phrases[Math.floor(Math.random() * phrases.length)];
    alert(nextRound);

    guessesLeft = 6;
    document.getElementById("guesses-left").innerHTML = guessesLeft;

    document.getElementById("letters-guessed").innerHTML = resetLettersGuessed;

    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    progressWord = [];
    for (i = 0; i < currentWord.length; i++) {
      progressWord.push("__");
    }
    document.getElementById("word-guess").innerHTML = progressWord.join(" ");

    wins++;
    document.getElementById("wins").innerHTML = wins;
  }
};
