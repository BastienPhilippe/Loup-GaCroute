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

const classMap = {
  "chasseur de fantome": ChasseurDeFantomes,
  "loup garou": LoupGarou,
  voyante: Voyante,
  divinateur: Divinateur,
  espion: Espion,
  "franc maçon": FrancMacon,
  gremlin: Gremlin,
  "loup shaman": LoupShaman,
  insomniaque: Insomniaque,
  voleur: Voleur,
};

function help(message, channel) {
  const command = message.slice(6);
  if (classMap[command]) {
    const temp = new classMap[command]();
    const classRule = temp.rule;
    delete temp;
    channel.send(classRule);
    console.log(classRule);
  } else {
    const classList = Object.keys(classMap).join(", ");
    channel.send(
      `Pour lire les règle d'un role du jeu, taper !help, suivi de l'un des rôle (${classList}). Exemple: *!help voyante*`
    );
  }
}

module.exports = help;
