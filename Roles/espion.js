const Role = require("./role");

class Espion extends Role {

    constructor() {
        super();
        this.name = "l'espion";
        this.nightOrder = 8;
        this.annonceVillage = "L'espion se réveille"
        this.team = "village"
        this.requireAction = true;
    }

    async playerNightAction(game, player) {
        player.sendDM("Choisissez deux joueur, pour savoir si ils sont dans la même équipe")
        const playerPicked1 = await player.pickPlayer(game.players)
        const playerPicked2 = await player.pickAnotherPlayer(game.players, playerPicked1)
        const playerNames = `${playerPicked1.getName()} et ${playerPicked2.getName()} `
        if(playerPicked1.role.team === playerPicked2.role.team) {
            player.sendDM(playerNames + "sont dans la même équipe")
        } else {
            player.sendDM(playerNames + "ne sont pas dans la même équipe")
        }
    }
}

module.exports = Espion