const _ = require("lodash");

const ChasseurDeFantomes = require("./Roles/chasseur-de-fantomes");
const LoupGarou = require("./Roles/loup-garou");
const Voyante = require("./Roles/voyante");
const Divinateur = require("./Roles/divinateur");
const Espion = require("./Roles/espion");
const FrancMacon = require("./Roles/franc-macon");
const Gremlin = require("./Roles/gremlin");
const LoupShaman = require("./Roles/loup-shaman");
const Insomniaque = require("./Roles/insomniaque");
const Voleur = require("./Roles/voleur");

const roles = {
  1: [LoupGarou],
  2: [LoupGarou, Voyante],
  3: [LoupGarou, Voyante, ChasseurDeFantomes],
  4: [LoupGarou, Voyante, Voyante, Voyante],
  5: [Gremlin, Gremlin, Gremlin, Gremlin, Gremlin],
  6: [LoupGarou, Voyante, ChasseurDeFantomes, Divinateur, LoupShaman, Espion],
  7: [LoupGarou, Voyante, Voleur, Divinateur, LoupShaman, Espion, Gremlin],
  8: [
    LoupGarou,
    Voyante,
    Voleur,
    Divinateur,
    LoupShaman,
    FrancMacon,
    FrancMacon,
    Gremlin,
  ],
  9: [
    LoupGarou,
    Voyante,
    ChasseurDeFantomes,
    Divinateur,
    LoupShaman,
    FrancMacon,
    FrancMacon,
    Espion,
    Gremlin,
  ],
  10: [
    LoupGarou,
    Voyante,
    ChasseurDeFantomes,
    Divinateur,
    LoupShaman,
    FrancMacon,
    FrancMacon,
    Espion,
    Gremlin,
    Insomniaque,
  ],
};

module.exports = function shambler(players) {
  const shuffledRoles = _.shuffle(roles[players.length]);
  console.log(players.length);
  let count = 0;
  players.forEach((player) => {
    player.assignRole(shuffledRoles[count]);
    if (player.member) {
      player.sendDM("Que la partie commence !!!");
      player.sendDM("Commençons par découvir votre rôle secret");
      player.sendIntro();
    }
    count++;
  });
};
