const Role = require("./role");

class LoupShaman extends Role {
  constructor() {
    super();
    this.name = "le loup shaman";
    this.nightOrder = 2;
    this.annonceVillage = "Le loup shaman se réveille";
    this.team = "loup";
    this.requireAction = true;
  }

  async playerNightAction(game, player) {
    await super.checkAutreLoup(game, player);
    player.sendDM("Choisissez le joeur dont vous voulez découvrir le rôle");
    const pickedPlayer = await player.pickPlayer(game.players);
    if (pickedPlayer) {
      pickedPlayer.sendRole(player);
    }
  }
}

module.exports = LoupShaman;
