const Role = require("./role");

class FrancMacon extends Role {

    constructor() {
        super();
        this.name = "un franc maçon";
        this.nightOrder = 4;
        this.annonceVillage = "un franc maçon se réveille"
        this.team = "village"
    }

    async playerNightAction(game, player) {
        const ami = game.getFrancMacon(player);
        if (ami) {
            player.sendDM(`${ami.getName()} est votre confrère franc maçon`)
        } else {
            player.sendDM("Il semblerait qu'il n'y est pas d'autre franc maçon")
        }
    }
}

module.exports = FrancMacon