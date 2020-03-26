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
    player.sendDM("Choisissez un premier joueur");
    const playerPicked1 = await player.pickPlayer(game.players);
    if (playerPicked1) {
      const playerPicked2 = await player.pickAnotherPlayer(
        game.players,
        playerPicked1
      );
      playerPicked1.switchRole(playerPicked2);
      player.sendDM(
        `Vous avez échangé les rôle de ${playerPicked1.getName()} et ${playerPicked2.getName()}`
      );
    }
  }
}

module.exports = Gremlin;
