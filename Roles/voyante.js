const Role = require("./role");

class Voyante extends Role {
  constructor() {
    super();
    this.name = "la voyante";
    this.nightOrder = 5;
    this.annonceVillage = "La voyante se réveille";
    this.team = "village";
    this.requireAction = true;
    this.rule =
      "La voyante maîtrise les arts mystiques. Elle a le choix entre, découvrir le rôle d'un des autre jours, ou alors découvrir les rôle de deux des trois mal heureux villageois mort la veille";
  }

  async playerNightAction(game, player) {
    player.sendDM("Que souhaitez vous faire ?");
    const choice = await player.pickSomething([
      {
        prompt: "Ne rien faire ?",
        value: false,
        dm: "Vous avez choisi de ne rien faire",
      },
      {
        prompt: "Regarder le rôle d'un autre joueur ?",
        value: "player",
        dm: "Vous avez choisi de regarder le rôle d'un autre joueur",
      },
      {
        prompt: "Regarder les rôles de deux des villageois morts ?",
        value: "middleCard",
        dm:
          "Vous avez choisi de regarder les rôles de deux des villageois morts",
      },
    ]);
    if (choice) {
      if (choice === "player") {
        const pickedPlayer = await player.pickPlayer(game.players, false);
        pickedPlayer.sendRole(player);
      } else {
        const pickedMiddleCards = await player.pickTwoPlayers(
          game.middleCards,
          false
        );
        pickedMiddleCards.forEach((card) => {
          card.sendRole(player);
        });
      }
    }
  }
}

module.exports = Voyante;
