const Role = require("./role");

class Voleur extends Role {

    constructor() {
        super();
        this.name = "le voleur";
        this.nightOrder = 6;
        this.annonceVillage = "Le voleur se réveille"
        this.team = "village"
        this.requireAction = true;
    }

    async playerNightAction(game, player) {
        player.sendDM("Vous pouvez échangez votre role avec un autre joueur")
        const pickedPlayer = await player.pickPlayer(game.players)
        player.sendDM(`Vous etes désormais ${pickedPlayer.role.name} et ${pickedPlayer.getName()} a pris votre rôle`)
        player.switchRole(pickedPlayer)
    }
}

module.exports = Voleur