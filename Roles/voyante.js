const Role = require("./role");

class Voyante extends Role {

        constructor() {
            super();
            this.name = "la voyante";
            this.nightOrder = 5;
            this.annonceVillage = "La voyante se réveille"
            this.team = "village"
            this.requireAction = true;
        }

        async playerNightAction(game, player) {
            player.sendDM("Vous pouvez regardez la carte d'un autre joueur")
            const pickedPlayer = await player.pickPlayer(game.players)
            pickedPlayer.sendRole(player);

        }
}

module.exports = Voyante