function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Role {
  constructor() {
    this.nightOrder = 0;
    this.name = "salade";
    this.annonceVillage = "salade";
    this.team = "salade";
    this.requireAction = false;
  }

  static rollTheRolls(playerList) {
    playerList.forEach((player) => {
      player.role = roleList[getRandomInt(8)];
    });
  }

  async checkAutreLoup(game, player) {
    const autreLoups = game.getLoups(player);
    if (autreLoups.length === 0) {
      player.sendDM(
        "Il n'y a pas d'autre loup garou, vous pouvez donc découvrir le rôle d'un des villageois décédés la veille"
      );
      const pickedCard = await player.pickPlayer(game.middleCards);
      pickedCard.sendRole(player);
    } else {
      player.sendDM(
        `Les autres loup sont ${autreLoups
          .map((loup) => loup.getName())
          .join(", ")}, tapez ok pour valider`
      );
      await player.awaitDManswer();
    }
  }

  async nightAction(game, player) {
    game.messageVillage(this.annonceVillage);
    if (!player.member) {
      function randomWait(min, max) {
        return Math.floor(Math.random() * (max - min) + min) * 1000;
      }
      if (this.requireAction) {
        await new Promise((resolve) => setTimeout(resolve, randomWait(1, 2)));
      }
    } else {
      await player.sendDM("Vous vous reveillez");
      await this.playerNightAction(game, player);
      await player.sendDM("Vous vous rendormez");
    }
  }
}

module.exports = Role;
