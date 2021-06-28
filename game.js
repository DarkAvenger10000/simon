var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var toggle = true;
var level = 0;

$(document).keypress(function(event) {
  if (toggle === true) {
    nextSequence();
  }
  toggle = false;
})

//button click

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed").delay(100);
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("h1").text("Press A Key to Start")
    }, 2000);
    startOver();
  }

}

function startOver(){
  level = 0;
  toggle = true;
  gamePattern = [];
  userClickedPattern = [];
}
