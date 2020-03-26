const Citizen = require("./citizen");

class Player extends Citizen {
  constructor(member) {
    super();
    this.member = member;
    this.dmChannel = member.createDM();
    this.role = undefined;
    this.nightOrder = 0;
    this.initialRole = undefined;
    this.middleCard = !member;
  }

  getName() {
    if (this.member) {
      return this.member.nickname
        ? this.member.nickname
        : this.member.user.username;
    }
  }

  async sendDM(content) {
    const dmChannel = await this.dmChannel;
    dmChannel.send(content);
  }

  async awaitDManswer() {
    const dmChannel = await this.dmChannel;
    const filter = (message) => message.author === this.member.user;
    const answer = await dmChannel.awaitMessages(filter, {
      max: 1,
      time: 0,
    });

    return answer.first().content;
  }

  async pickPlayer(playerList, canBeNone = true) {
    const help = "*Entrez le nombre correspondant a votre choix*";
    function assertPlayerId(id, player) {
      if (canBeNone && id === -1) {
        return true;
      }
      if (!Number.isInteger(id)) {
        player.sendDM("veuillez entrer un nombre");
        return false;
      }
      if (!playerList[id]) {
        player.sendDM("ce nombre est chelou, verifie mec");
        return false;
      }
      if (
        playerList[id].member &&
        playerList[id].member.id === player.member.id
      ) {
        player.sendDM("vous ne pouvez pas vous choisir vous même");
        return false;
      }
      return true;
    }
    const players = playerList.map((player, id) => {
      id++;
      return `**${id}** => ${player.getName()}`;
    });
    if (canBeNone) {
      players.unshift("**0** => Pour ne choisir personne");
    }
    const prompt = players.join("\n");
    let userId;
    do {
      console.log(prompt);
      this.sendDM(prompt);
      this.sendDM(help);
      userId = await this.awaitDManswer();
      userId--;
    } while (!assertPlayerId(userId, this));
    if (userId === -1) {
      this.sendDM(`Vous n'avez choisis personne`);
      return undefined;
    }
    this.sendDM(`Vous avez choisi ${playerList[userId].getName()}`);
    return playerList[userId];
  }

  async pickAnotherPlayer(playerList, firstPlayer) {
    function assertNoTheSamePlayer(picker, pickedPlayer) {
      if (pickedPlayer.member.id === firstPlayer.member.id) {
        picker.sendDM("Vous ne pouvez pas choisir deux fois le même joueur");
        return false;
      }
      return true;
    }
    let pickedPlayer;
    do {
      pickedPlayer = await this.pickPlayer(playerList, false);
    } while (!assertNoTheSamePlayer(this, pickedPlayer));
    return pickedPlayer;
  }

  sendIntro() {
    this.sendRole();
    this.sendDM(`**Vous faites partie de l'équipe ${this.role.team}**`);
    this.sendDM(`*${this.role.rule}*`);
  }

  static isEligiblePlayer(guildMember) {
    return !guildMember.user.bot && guildMember.presence.status === "online";
  }
}

module.exports = Player;
