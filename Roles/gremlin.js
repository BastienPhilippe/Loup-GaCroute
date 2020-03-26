const Role = require("./role");

class Gremlin extends Role {
  constructor() {
    super();
    this.name = "le gremlin";
    this.nightOrder = 7;
    this.annonceVillage = "Le gremlin se réveille";
    this.team = "village";
    this.requireAction = true;
    this.rule =
      "Le gremlin est une fourbe créature, il inverse les rôle de deux joueurs sans en prendre connaissance";
  }

  async playerNightAction(game, player) {
    const playersPicked = await player.pickTwoPlayers(game.players);
    if (playersPicked) {
      playersPicked[0].switchRole(playersPicked[1]);
      player.sendDM(
        `Vous avez échangé les rôle de ${playersPicked[0].getName()} et ${playersPicked[1].getName()}`
      );
    }
  }
}

module.exports = Gremlin;
