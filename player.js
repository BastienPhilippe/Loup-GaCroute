const Citizen = require("./citizen");

class Player extends Citizen {
  constructor(member) {
    super();
    this.id = member.user.id;
    this.member = member;
    this.dmChannel = member.createDM();
    this.role = undefined;
    this.nightOrder = 0;
    this.initialRole = undefined;
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

  async pickSomething(things) {
    const help = "*Entrez le nombre correspondant a votre choix*";

    function assertAnswerIsCorrect(id, player) {
      if (!Number.isInteger(id)) {
        player.sendDM("veuillez entrer un nombre");
        return false;
      }
      if (!things[id]) {
        player.sendDM("ce nombre est chelou, verifie mec");
        return false;
      }
      return true;
    }
    const prompt = things
      .map((thing, id) => `**${id}** => ${thing.prompt}`)
      .join("\n");
    let answerId;
    do {
      this.sendDM(prompt);
      this.sendDM(help);
      answerId = parseInt(await this.awaitDManswer());
    } while (!assertAnswerIsCorrect(answerId, this));
    this.sendDM(things[answerId].dm);
    return things[answerId].value;
  }

  async pickPlayer(
    playerList,
    canBeNone = true,
    msg = "Choisissez une personne"
  ) {
    const playerListToPick = playerList
      .filter((player) => player.id !== this.id)
      .map((player) => ({
        prompt: player.getName(),
        value: player,
        dm: `Vous avez choisi ${player.getName()}`,
      }));

    if (canBeNone) {
      playerListToPick.unshift({
        prompt: "Pour ne choisir personne",
        value: null,
        dm: "Vous n'avez choisis personne",
      });
    }
    this.sendDM(msg);
    return await this.pickSomething(playerListToPick);
  }

  async pickTwoPlayers(playerList, canBeNone = true) {
    const firstPlayer = await this.pickPlayer(playerList, canBeNone);
    if (firstPlayer) {
      const listShortened = playerList.filter(
        (player) => player.id !== firstPlayer.id
      );
      const secondPlayer = await this.pickPlayer(
        listShortened,
        false,
        "Choisissez une autre personne"
      );
      return [firstPlayer, secondPlayer];
    }
    return null;
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
