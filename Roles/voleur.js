const Role = require("./role");

class Voleur extends Role {
  constructor() {
    super();
    this.name = "le voleur";
    this.nightOrder = 6;
    this.annonceVillage = "Le voleur se réveille";
    this.team = "village";
    this.requireAction = true;
    this.rule =
      "Le voleur, comme son nom l'indique, vole le role d'un autre joueur. Il regarde le rôle d'un autre joueur, et l'échange avec le siens";
  }

  async playerNightAction(game, player) {
    player.sendDM("Choisissez un joueur dont vous voulez voler le role");
    const pickedPlayer = await player.pickPlayer(game.players);
    if (pickedPlayer) {
      player.sendDM(
        `Vous etes désormais **${
          pickedPlayer.role.name
        }** et ${pickedPlayer.getName()} a pris votre rôle`
      );
      player.switchRole(pickedPlayer);
    }
  }
}

module.exports = Voleur;
