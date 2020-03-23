const Role = require("./role");

class Insomniaque extends Role {

    constructor() {
        super();
        this.name = "l'insomniaque'";
        this.nightOrder = 9;
        this.annonceVillage = "L'insomniaque se réveille"
        this.team = "village"
    }

    async playerNightAction(game, player) {
        if(player.role.nightOrder === this.nightOrder) {
            player.sendDM("Vous etes toujours l'insomniaque")
        } else {
            player.sendDM(`Vous avez changez de role, vus etes désormais ${player.role.name}`)
        }
    }
}

module.exports = Insomniaque