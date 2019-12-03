var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var indx = 0;

function nextSequence() {
  userClickedPattern.length = 0;
  var chosenColour = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[chosenColour];
  gamePattern.push(randomChosenColour);
  // fadeButton(randomChosenColour);
  setTimeout(function() {
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
  }, 500);
  level++;
  $("h1").text("Level " + level);
}

$(document).keypress(function(event) {
  switch (event.key) {
    case "s":
      if (!gameStarted) {
        nextSequence();
        gameStarted = true;
        $("#level-title").text("Level " + level);
      }
      break;
    default:
  }
});


$("div.btn").click(function(event) {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // fadeButton(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  if (gamePattern.length == userClickedPattern.length) {
    checkAnswer(indx);
  }
  indx++;
})


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function fadeButton(id) {
  $("#" + id).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
  });
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var passed = true;
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      passed = false;
      break;
    } else {
      passed = true;
    }
  }
  if (passed) {
    setTimeout(function(){
      nextSequence()
    }, 1000);
  } else {
    startOver();
  }
}

function startOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press S to Restart");
  level = 0;
  indx = 0;
  gamePattern.length = 0;
  gameStarted = false;
}
