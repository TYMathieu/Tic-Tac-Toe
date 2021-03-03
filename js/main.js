let morpion = new Morpion();

// Depart du jeu
startElement = document.getElementById("start");
setter = document.getElementById("setter");
morpionElement = document.getElementById("morpion");
mainsection = document.getElementById("mainsection");
name1 = document.getElementById("name1");
name2 = document.getElementById("name2");

// Le morpion en lui même

function sendMessage(msg) {
  let msgElement = document.getElementById("message");
  msgElement.innerHTML = msg;
}

function iswin() {
  if (morpion.isVictory()) {
    aftergame = document.getElementById("aftergame");
    aftergame.style.display = "block";
    morpion.win(morpion.joueurActuel);
    morpion.isPlayable = false;
  } else if (morpion.counter == 9) {
    aftergame.style.display = "block";
    sendMessage("Match nul !");
    morpion.isPlayable = false;
  }
}

// Verification de l'appuie des cellules
function start() {
  for (let i = 0; i < morpion.cells.length; i++) {
    morpion.cells[i].addEventListener("click", () => {
      if (morpion.cells[i].innerHTML == "" && morpion.isPlayable) {
        morpion.cells[i].innerHTML = morpion.playCell(i);
        if (morpion.counter >= 5) {
          iswin();
        }

        if (morpion.isPlayable) {
          morpion.alternate();
          morpion.changeTurn(morpion.joueurActuel, "green");
        }
      }
    });
  }
}

// Mes fonctions de boutons

function changeParam() {
  setter.style.display = "block";
  mainsection.style.display = "none";
  morpionElement.innerHTML = "";
  aftergame.style.display = "none";
}

function returnParam() {
  changeParam();
  morpion.reinitScore();
}

function button() {
  if (
    document.getElementById("avatar1").value ==
    document.getElementById("avatar2").value
  ) {
    sendMessage("Vous ne pouvez pas choisir le même avatar");
  } else if (
    document.getElementById("joueur1").value ==
    document.getElementById("joueur2").value
  ) {
    sendMessage("Vous ne pouvez pas choisir le même pseudo");
  } else {
    setter.style.display = "none";
    mainsection.style.display = "flex";
    name1.innerHTML = document.getElementById("joueur1").value;
    name2.innerHTML = document.getElementById("joueur2").value;
    for (let i = 0; i < 9; i++) {
      morpionElement.innerHTML += "<div class='cell'></div>";
    }
    morpion.init();
    document.getElementById("profil1").src = morpion.src(1);
    document.getElementById("profil2").src = morpion.src(2);
    start();
    morpion.changeScore(1);
    morpion.changeScore(2);
    morpion.changeTurn(morpion.joueurActuel, "green");
  }
}

function newGame() {
  morpion.init();
  for (let i = 0; i < morpion.cells.length; i++) {
    morpion.cells[i].innerHTML = "";
  }
  morpion.changeTurn(morpion.joueurActuel, "green");
  aftergame.style.display = "none";
}
