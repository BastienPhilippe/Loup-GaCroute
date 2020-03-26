const Player = require("./player");
const MiddleCard = require("./middle-card");
const shambler = require("./shambler");
const FrancMacon = require("./Roles/franc-macon");

class Game {
  constructor(guild, channel) {
    this.guild = guild;
    this.channel = channel;
    this.players = [];
    this.middleCards = [];
    this.citizens = [];
    this.morningNews = [];
    this.startGame();
  }

  messageVillage(content) {
    this.channel.send(content);
  }

  pushLine() {
    this.channel.send("_ _");
  }

  async startGame() {
    const members = await this.guild.members.fetch();
    members.forEach((member) => {
      if (Player.isEligiblePlayer(member)) {
        this.players.push(new Player(member));
      }
    });
    if (this.players.length < 5) {
    }
    this.middleCards = [
      new MiddleCard("cerceuil gris"),
      new MiddleCard("cerceuil noir"),
      new MiddleCard("cerceuil marron"),
    ];

    this.citizens.push(...this.players, ...this.middleCards);

    this.messageVillage(
      "Bonjour à toutes et à tous, je suis l'esprit du village, mon rôle est de vous guider dans cette partie"
    );
    this.messageVillage(
      "Il semblerait que des loup garou ce soitent infiltré dans le village"
    );
    this.messageVillage("Je vais assigner a chacun de vous un rôle secret");
    this.pushLine();

    shambler(this.citizens);

    await this.night();
    this.pushLine();
    this.wakeUp();
    // this._morningDebug()

    const pendingVotes = this.getVote();
    this.pushLine();

    Promise.all(pendingVotes).then((votes) => {
      const deadPlayers = this.execution(votes);
      const winningTeam = this.whoWins(deadPlayers);
      this.finalRecap(winningTeam);
    });
  }

  async night() {
    this.citizens.sort(
      (playerA, playerB) =>
        playerA.initialRole.nightOrder - playerB.initialRole.nightOrder
    );

    for (const player of this.citizens) {
      await player.nightAction(this);
    }
  }

  getLoups(askingPlayer) {
    return this.players.filter(
      (player) =>
        player.role.team === "loup" &&
        player.member.id !== askingPlayer.member.id
    );
  }

  getFrancMacon(askingPlayer) {
    return this.players.find(
      (player) =>
        player.role instanceof FrancMacon &&
        player.member.id !== askingPlayer.member.id
    );
  }

  wakeUp() {
    this.morningNews.unshift("Le soleil se lève c'est le matin");
    this.morningNews.push(
      "A vous de jouer pour trouver qui sont les loups garous"
    );

    this.messageVillage(this.morningNews.join("\n"));
  }

  getVote() {
    return this.players.map((player) => {
      player.sendDM("Il est l'heure de choisir qui vous voulez voir mourir");
      return player.pickPlayer(this.players, false);
    });
  }

  getPlayerById(id) {
    return this.players.find((player) => player.member.id === id);
  }

  execution(votes) {
    const deathMap = new Map();
    let currentHighest = 0;
    let deadPlayersId = [];
    votes.forEach((player) => {
      const previousScore = deathMap.get(player.member.id) || 0;
      const newScore = previousScore + 1;
      deathMap.set(player.member.id, newScore);
      if (newScore === currentHighest) {
        deadPlayersId.push(player.member.id);
      }
      if (newScore > currentHighest) {
        deadPlayersId = [player.member.id];
        currentHighest = newScore;
      }
    });
    if (deadPlayersId.length === this.players.length) {
      deadPlayersId = [];
    }
    const deadPlayers = deadPlayersId.map((id) => this.getPlayerById(id));
    if (deadPlayers.length === 0) {
      this.messageVillage("Vous avez décidé de ne tuer personne");
    } else {
      this.messageVillage(
        `Vous avez décidé de tuer ${deadPlayers
          .map((player) => player.getName())
          .join("et ")}`
      );
    }
    return deadPlayers;
  }

  _morningDebug() {
    this.players.forEach((player) => {
      console.log(
        `${player.getName()} : ${player.initialRole.name} => ${
          player.role.name
        } team : ${player.role.team}`
      );
    });
    console.log("**********************************************************");
    this.middleCards.forEach((card) => {
      console.log(
        `${card.getName()} : ${card.initialRole.name} => ${card.role.name}`
      );
    });
  }

  whoWins(deadPlayers) {
    const unLoupEstMort = deadPlayers.some(
      (player) => player.role.team === "loup"
    );
    const pasDeLoup = this.players.every(
      (player) => player.role.team !== "loup"
    );
    const personneEstMore = deadPlayers.length === 0;

    if (unLoupEstMort || (personneEstMore && pasDeLoup)) {
      return "village";
    }
    return "loup";
  }

  finalRecap(winningTeam) {
    function displayPlayer(player, game) {
      game.messageVillage(
        `${player.getName()} : role initial ${
          player.initialRole.name
        }, role en fin de partie ${player.role.name}`
      );
    }
    this.pushLine();
    this.messageVillage(`l'équipe ${winningTeam} a gagné !!!`);
    this.pushLine();

    this.messageVillage(`Les gagnants sont:`);
    this.players
      .filter((player) => player.role.team === winningTeam)
      .forEach((winningPlayer) => {
        displayPlayer(winningPlayer, this);
      });
    const losingTeam = winningTeam === "loup" ? "village" : "loup";
    this.pushLine();
    this.pushLine();
    this.messageVillage(`l'équipe ${losingTeam} a perdu :(`);
    this.pushLine();
    this.messageVillage(`Les perdant sont:`);
    this.players
      .filter((player) => player.role.team === losingTeam)
      .forEach((loser) => {
        displayPlayer(loser, this);
      });
  }
}

module.exports = Game;
