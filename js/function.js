class Morpion {
  constructor() {
    this.score1 = 0;
    this.score2 = 0;
  }

  init() {
    // Récupération des noms de joueurs
    this.joueur1 = document.getElementById("joueur1").value;
    this.joueur2 = document.getElementById("joueur2").value;
    // Récupération des avatars des joueurs
    this.avatar1 = document.getElementById("avatar1").value;
    this.avatar2 = document.getElementById("avatar2").value;
    // Joueurs aléatoires
    let random = Math.floor(Math.random() * Math.floor(2));
    random == 1
      ? (this.joueurActuel = this.joueur1)
      : (this.joueurActuel = this.joueur2);
    this.state = [];
    this.counter = 0;
    this.isPlayable = true;
    this.cells = document.getElementsByClassName("cell");
  }

  // J'alterne les joueurs
  alternate() {
    this.joueurActuel =
      this.joueurActuel == this.joueur1 ? this.joueur2 : this.joueur1;
  }

  // Affichage de la couleur du joueur en cours
  changeTurn(joueur, color) {
    let interface1 = document.getElementById("interface1");
    let interface2 = document.getElementById("interface2");
    joueur === this.joueur1
      ? (interface1.style.backgroundColor = color)
      : (interface2.style.backgroundColor = color);
    joueur === this.joueur1
      ? (interface2.style.backgroundColor = "white")
      : (interface1.style.backgroundColor = "white");
  }

  // Envoie de l'image sur la case joué
  playCell(pos) {
    this.counter++;
    this.state[pos] = this.joueurActuel;
    if (this.joueurActuel == this.joueur1) {
      return "<img src=images/" + this.avatar1 + ".jpg><img>";
    } else {
      return "<img src=images/" + this.avatar2 + ".jpg><img>";
    }
  }

  // renvoie le src de l'avatar du joueur
  src(player) {
    player === 1 ? (player = this.avatar1) : (player = this.avatar2);
    return "images/" + player + ".jpg";
  }

  // Affichage du nouveau score
  changeScore(player) {
    let scoreplace = document.getElementById("score" + player);
    player === 1
      ? (scoreplace.innerHTML = this.score1)
      : (scoreplace.innerHTML = this.score2);
  }

  // Quand le joueur a gagné, changement des scores + affichage du gagnant
  win(joueur) {
    joueur === this.joueur1 ? (this.score1 += 1) : (this.score2 += 1);
    joueur === this.joueur1 ? this.changeScore(1) : this.changeScore(2);
    morpion.changeTurn(morpion.joueurActuel, "gold");
  }

  // Reinitialisation des scores
  reinitScore() {
    this.score1 = 0;
    this.score2 = 0;
  }

  isVictory() {
    /* EN LIGNE */
    // Boucle inbriqué
    for (let i of [0, 3, 6]) {
      if (
        this.state[i] == this.joueurActuel &&
        this.state[i] == this.state[i + 1] &&
        this.state[i + 1] == this.state[i + 2]
      ) {
        return true;
      }
    }
    /* EN COLONNE */
    for (let i of [0, 1, 2]) {
      if (
        this.state[i] == this.joueurActuel &&
        this.state[i] == this.state[i + 3] &&
        this.state[i + 3] == this.state[i + 6]
      ) {
        return true;
      }
    }
    /* EN DIAGONALE */
    if (
      this.state[0] == this.joueurActuel &&
      this.state[0] == this.state[4] &&
      this.state[4] == this.state[8]
    ) {
      return true;
    }
    if (
      this.state[2] == this.joueurActuel &&
      this.state[2] == this.state[4] &&
      this.state[4] == this.state[6]
    ) {
      return true;
    }
    /*retour automatique si aucun des if ci-dessus n'a été vérifié */
    return false;
  }
}
