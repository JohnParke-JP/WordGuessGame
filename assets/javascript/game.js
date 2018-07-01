var m_iAllowedGuesses = 6; //Head + 2 arms + 2 legs + body.
var m_iBadGuessCount = 0;
var m_iWinCount = 0;
var m_bGameOver = true;
var m_iCurMusicain = 0;
var m_sGuesses = "";
var m_aMusicians = [];

var m_elementThumb = document.getElementById('thumb');
var m_elementHint = document.getElementById('hint');
var m_elementMsg = document.getElementById('msg');
var m_elementWins = document.getElementById('wins');
var m_elementName = document.getElementById('name');
var m_elementRemaining = document.getElementById('remaining');
var m_elementGuesses = document.getElementById('guesses');
var m_elementSound = document.getElementById('myAudio');

// First call to get the game started.
initializeGame();

// Hook the Key Up event.
document.onkeyup = function (event) {
  var sKey = String.fromCharCode(event.keyCode).toUpperCase();
  if (m_bGameOver) {
    initializeRound();
  } else {
    handleNewKeyPress(sKey);
  }
};

// Game initalization.  Should only be called once
// after the page loads.
function initializeGame() {
  // Initalize the win count
  m_iWinCount = 0;
  m_bGameOver = true;

  // Initalize the musician array
  var musician = {
    name: "Generic Blues",
    thumb: "./assets/images/GenericBlues.jpg",
    hint: "Press any key begin."
  }
  m_aMusicians.push(musician);

  var musician = {
    name: "BB King",
    thumb: "./assets/images/BBKing.jpg",
    hint: "King of the Blues!"
  }
  m_aMusicians.push(musician);

  var musician = {
    name : "Bessie Smith",
    thumb : "./assets/images/BessieSmith.jpg",
    hint : "Empress of the Blues!"
  }
  m_aMusicians.push(musician);

  var musician = {
    name : "Buddy Guy",
    thumb : "./assets/images/BuddyGuy.jpg",
    hint : "Eric Clapton calls him, 'Best guitar player alive!'"
  }
  m_aMusicians.push(musician);

  var musician = {
    name : "Eric Clapton",
    thumb : "./assets/images/EricClapton.jpg",
    hint : "In the RockNRoll Hall of Fame 3 times!"
  }
  m_aMusicians.push(musician);

  var musician = {
    name : "Etta James",
    thumb : "./assets/images/EttaJames.jpg",
    hint : "6 Grammy Awards & 17 Blues Music Awards!"
  }
  m_aMusicians.push(musician);

  var musician = {
    name : "Howlin Wolf",
    thumb : "./assets/images/HowlinWolf.jpg",
    hint : "Evil is goin' on!"
  }
  m_aMusicians.push(musician);

  var musician = {
    name : "Muddy Waters",
    thumb : "./assets/images/MuddyWaters.jpg",
    hint : "Father of Chicago Blues!"
  }
  m_aMusicians.push(musician);

  console.log(m_aMusicians);
  console.log("initalizeGame complete.");

}

// Round initlaization.  Called each time a new round
// of the game is started.
function initializeRound() {

  if (typeof initializeRound.HasBeenCalled === "undefined") {

    //ignore the first key event.
    initializeRound.HasBeenCalled = true;

  } else {

    m_sGuesses = " "; //Start off with a space.
    m_iBadGuessCount = 0;
    m_bGameOver = false;
    m_iCurMusicain = 0

    //Pick a new "Current Musician"
    //Current musician must be between 1 and last array indecie.
    do {
      m_iCurMusicain = Math.floor(Math.random() * m_aMusicians.length)
    }
    while (m_iCurMusicain <= 0);
    //console.log(m_aMusicians[m_iCurMusicain));

    //Display current musicianin info
    displayThumb();
    displayHint();
    displayUserMessage("Press a key A-Z");
    displayWins();
    displayName();
    displayGuessesRemaining();
    displayLettersGuessed();
  }
}

// Eavlauate the users guess.  Called by the
// key up event handler.
function handleNewKeyPress(sLetter) {

  sLetter = sLetter.toUpperCase();

  if (isLetter(sLetter)) {

    //If this is a new letter then... 
    if (m_sGuesses.indexOf(sLetter.toString()) === -1) {

      //add it the guesses string.
      m_sGuesses += sLetter;

      evaluateGuess(sLetter);

      //display results
      displayGuessesRemaining();
      displayName();
      displayLettersGuessed();

      //and test for win.
      TestForAWin();

    } else {
      displayUserMessage("You alread tried that letter.");
    }

  } else {
    displayUserMessage("Please only select letters A-Z");
  }

}

function evaluateGuess(sLetter) {

  var sName = m_aMusicians[m_iCurMusicain].name.toUpperCase();

  //If letter does not exist in the musicians name...
  if (sName.indexOf(sLetter.toString()) === -1) {
    m_iBadGuessCount++; //increment the bad guess count.
  }

}

// Calculates the number of guesses the user
// still has.  Called by displayGuessesRemaining
// to show the user how many they have left.
function guessesRemaining() {
  return (m_iAllowedGuesses - m_iBadGuessCount);
}

// Checks to see if the user has won or lost
// and updates the win count and displays
// acordingly.  Called by handleNewKeyPress.
function TestForAWin() {
  // try {
  var s = m_elementName.textContent;

  // If there are no underscores in the display name...
  if (s.indexOf("_") === -1) {

    // increment the win count
    m_iWinCount++;
    m_bGameOver = true;
    // display the results.
    displayWins();
    displayUserMessage("Press any key for another game.");
    alert("You Win!");

    // If the user has used too many guesses...
  } else if (m_iBadGuessCount >= m_iAllowedGuesses) {

    m_bGameOver = true;
    // give them the sad news.
    displayUserMessage("You Loose.");
    alert("You Loose.");

  }

  // } catch (err) {
  //   logError(err);
  // }
}

// Tests if the user has pressed a letter 
// key. Called by handleNewKeyPress.
function isLetter(s) {
  return s.length === 1 && s.match(/[A-Z]/i);
}

// BEGIN Display Functions
// These functions format the HTML elements
// and show them to the user.
function displayThumb() {
  m_elementThumb.src = m_aMusicians[m_iCurMusicain].thumb.toString();
}

function displayUserMessage(s) {
  m_elementMsg.textContent = s;
}

function displayHint() {
  m_elementHint.textContent = m_aMusicians[m_iCurMusicain].hint;
}

function displayWins() {
  m_elementWins.textContent = "Wins:  " + m_iWinCount.toString();
}

function displayName() {

  var sName = m_aMusicians[m_iCurMusicain].name.toUpperCase();
  var sDName = "";

  if (m_sGuesses.length > 0) {

    for (var i = 0; i < sName.length; i++) {

      // Get a single letter from the name.
      var sChar = sName.charAt(i);

      // If the user has guessed the letter display it.
      if (m_sGuesses.includes(sChar)) {
        sDName = sDName + sChar + " ";
      }

      // Otherwise, display an underscore.
      else {
        sDName = sDName + "_  ";
      }

    }
    //sDName = sDName.replace("  ", "/ ");
  }

  m_elementName.textContent = sDName;

}

function displayGuessesRemaining() {
  var s = "Number of guesses remaining: "
  s += guessesRemaining();
  m_elementRemaining.textContent = s;
}

function displayLettersGuessed() {
  // try {
  var sGuesses = m_sGuesses.toLocaleUpperCase();
  var sDName = ""; //string to hold display name.

  if (sGuesses.length > 0) {

    for (var i = 0; i < sGuesses.length; i++) {

      // Get a single letter from the name.
      var sChar = sGuesses.charAt(i);
      // add char and a space.
      sDName += (sChar + " ");

    }

  }
  // prepend the Header.
  var sDName = "Letters already guessed: " + sDName;

  //show the user
  m_elementGuesses.textContent = sDName;

  // } catch (err) {
  //   logError(err);
  // }
}

function playSound(s) {
  m_elementSound.pause
}
// END Display Functions

function logError(e) {

  var s = "";

  if (e.message) {
    s += e.message;
  }

  if (e.stack) {
    s += ' | stack: ' + e.stack;
  }
  console.log(s);
}