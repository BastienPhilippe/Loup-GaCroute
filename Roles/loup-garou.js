const Role = require("./role");

class LoupGarou extends Role {

        constructor() {
            super();
            this.name = "le Loup Garou";
            this.nightOrder = 1;
            this.annonceVillage = "Le loup garou se réveille"
            this.team = "loup"
            this.requireAction = true;
        }

        async playerNightAction(game, player) {
            await super.checkAutreLoup(game, player);
        }
}

module.exports = LoupGarou