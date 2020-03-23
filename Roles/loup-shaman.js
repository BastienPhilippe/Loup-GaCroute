const Role = require("./role");

class LoupShaman extends Role {

    constructor() {
        super();
        this.name = "le loup shaman";
        this.nightOrder = 2;
        this.annonceVillage = "Le loup shaman se réveille"
        this.team = "loup"
        this.requireAction = true;
    }

    async playerNightAction(game, player) {
        await super.checkAutreLoup(game, player);
        player.sendDM("Vous pouvez regardez la carte d'un autre joueur")
        const pickedPlayer = await player.pickPlayer(game.players)
        pickedPlayer.sendRole(player);
    }
}

module.exports = LoupShaman