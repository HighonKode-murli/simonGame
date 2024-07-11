$(document).ready(function () {
  var level = 1;
  var userGameSeq = [];
  var gameSeq = [];

  $(".start").click(function () {
    $(".start").animate({ opacity: 0.2 },100).animate({ opacity: 0 },50);
    gameStart();
  });

  function gameStart() {
    $("h1").addClass("normalh1");
    $("h1").text("Level " + level);
    $("h1").animate({ opacity: 0.5 }).animate({ opacity: 1 });
    gameSeq = generateGameSeq(level);
    displaySeq(gameSeq);
    userGameSeq = [];
  }

  function playSound(key) {
    switch (key) {
      case 1:
        new Audio("./sounds/green.mp3").play();
        break;
      case 2:
        new Audio("./sounds/red.mp3").play();
        break;
      case 3:
        new Audio("./sounds/yellow.mp3").play();
        break;
      case 4:
        new Audio("./sounds/blue.mp3").play();
        break;
      default:
        break;
    }
  }

  function generateGameSeq(level) {
    var seq = [];
    for (i = 1; i <= level; i++) {
      seq.push(Math.ceil(Math.random() * 4));
    }
    return seq;
  }

  function displaySeq(seq) {
    var i = 0;
    var interval = setInterval(function () {
      $("#" + seq[i])
        .animate({ opacity: 0.5 })
        .animate({ opacity: 1 });
      playSound(seq[i]);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
      }
    }, 500);
  }

  $(".btn").click(function () {
    var buttonId = parseInt(this.getAttribute("id"));
    userGameSeq.push(buttonId);
    $("#" + buttonId)
      .animate({ opacity: 0.5 },100)
      .animate({ opacity: 1 },100);
    playSound(buttonId);
    if (checkSeq() === false) {
      endGame();
    } else if (userGameSeq.length === gameSeq.length) {
      level++;
      setTimeout(gameStart, 1000);
    }
  });

  function checkSeq() {
    for (i = 0; i < userGameSeq.length; i++) {
      if (userGameSeq[i] !== gameSeq[i]) {
        return false;
      }
    }
    return true;
  }

  function endGame() {
    level = 1;
    gameSeq = [];

    $("h1").addClass("normalh1");
    $("h1").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");

    },200);
    $("h1").animate({ opacity: 0.5 }).animate({ opacity: 1 });
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(function () {
      $(".start").text("Restart");
      $(".start").addClass("restart");
      $(".start").animate({ opacity: 0.5 },100).animate({ opacity: 1 },100);
    }, 1000);
  }
});
