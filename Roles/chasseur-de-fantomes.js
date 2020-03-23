const Role = require("./role");

class ChasseurDeFantomes extends Role {

    constructor() {
        super();
        this.name = "le chasseur de fantomes";
        this.nightOrder = 6;
        this.annonceVillage = "Le chasseur de fantomes se réveille"
        this.team = "village";
        this.requireAction = true;
        this.rule = "Le chasseur de fantôme peux regarder le role d'un autre joueur, mais attention si vous découvrez un loup garou, vous changer d'équipe rejoignez le camp des loup. Si ce n'est pas un loup garou, vous pouvez prendre le risque de regarder le role d'un autre joueur, les mêmes règles s'appliquent";
    }

    async playerNightAction(game, player) {
        function transformation(team) {
            if (team === "loup") {
                player.sendDM("**Vous êtes désormais dans l'équipe des loup !!!**")
                player.role.team = "loup"
                return true;
            }
            return false
        }

        player.sendDM("Vous pouvez découvrir le role d'un premier joueur")
        const pickedPlayer = await player.pickPlayer(game.players)
        if (!pickedPlayer) {
            return
        }
        pickedPlayer.sendRole(player);
        if (!transformation(pickedPlayer.team)) {
            player.sendDM("Vous pouvez regardez le role d'un autre joueur")
            const secondPickedPlayer = await player.pickAnotherPlayer(game.players, pickedPlayer)
            if (secondPickedPlayer) {
                secondPickedPlayer.sendRole(player);
                transformation(secondPickedPlayer.team)
            }

        }

    }
}

module.exports = ChasseurDeFantomes