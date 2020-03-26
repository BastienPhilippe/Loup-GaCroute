const Role = require("./role");

class FrancMacon extends Role {
  constructor() {
    super();
    this.name = "un franc maçon";
    this.nightOrder = 4;
    this.annonceVillage = "un franc maçon se réveille";
    this.team = "village";
    this.rule =
      "Il y a deux franc maçon dans le village, la nuit ils se retrouvent pour leur réunion secrète. Les deux franc maçon savent donx que leur confrère n'est pas un loup garou";
  }

  async playerNightAction(game, player) {
    const ami = game.getFrancMacon(player);
    if (ami) {
      player.sendDM(`${ami.getName()} est votre confrère franc maçon`);
    } else {
      player.sendDM("Il semblerait qu'il n'y est pas d'autre franc maçon");
    }
  }
}

module.exports = FrancMacon;
