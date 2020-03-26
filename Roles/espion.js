const Role = require("./role");

class Espion extends Role {
  constructor() {
    super();
    this.name = "l'espion";
    this.nightOrder = 8;
    this.annonceVillage = "L'espion se réveille";
    this.team = "village";
    this.requireAction = true;
    this.rule =
      "L'espion peut se renseigner sur deux autres joueur afin de savoir si ils font partie de la même équipe. Mais il ne saurat pas pour autant pas si ces joueur sont des loups garou ou non";
  }

  async playerNightAction(game, player) {
    player.sendDM("Choisissez un premier joueur");
    const playerPicked1 = await player.pickPlayer(game.players);
    if (playerPicked1) {
      player.sendDM("Choisissez un second premier joueur");
      const playerPicked2 = await player.pickAnotherPlayer(
        game.players,
        playerPicked1
      );
      const playerNames = `${playerPicked1.getName()} et ${playerPicked2.getName()} `;
      if (playerPicked1.role.team === playerPicked2.role.team) {
        player.sendDM(playerNames + "sont dans la même équipe");
      } else {
        player.sendDM(playerNames + "ne sont pas dans la même équipe");
      }
    }
  }
}

module.exports = Espion;
