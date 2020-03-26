const Role = require("./role");

class Insomniaque extends Role {
  constructor() {
    super();
    this.name = "l'insomniaque'";
    this.nightOrder = 9;
    this.annonceVillage = "L'insomniaque se réveille";
    this.team = "village";
    this.rule =
      "L'insomniaque a le sommeil léger, elle se reveille avant tout le monde et vérifie si son rôle a changer pendant la nuit";
  }

  async playerNightAction(game, player) {
    if (player.role instanceof Insomniaque) {
      player.sendDM("Vous etes toujours l'insomniaque");
    } else {
      player.sendDM(
        `Vous avez changez de role pendant la nuit, vous etes désormais **${player.role.name}**`
      );
    }
  }
}

module.exports = Insomniaque;
