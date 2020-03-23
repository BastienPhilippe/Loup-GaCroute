const Role = require("./role");

const notFlippyRole = [1,2]

class Divinateur extends Role {

    constructor() {
        super();
        this.name = "le divinateur";
        this.nightOrder = 9;
        this.annonceVillage = "Le divinateur se réveille"
        this.team = "village"
        this.requireAction = true;
        this.rule = "*Le divinateur permet d'innocenter un jouer. Vous pouvez regarer le role d'un autre joueur, si ce n'est pas un loup garou, ce rôle est revelé a l'ensemble du village*"
    }



    async playerNightAction(game, player) {
        player.sendDM("Choisissez le joueur que vous voulez essayer d'innocenter")
        const pickedPlayer = await player.pickPlayer(game.players)
        if(pickedPlayer) {
            pickedPlayer.sendRole(player);
            if (notFlippyRole.includes(pickedPlayer.role.nightOrder)) {

                game.morningNews.push(`le divinateur a révélé que ${pickedPlayer.getName()} est ${pickedPlayer.role.name}`)
            }
        }
    }
}

module.exports = Divinateur