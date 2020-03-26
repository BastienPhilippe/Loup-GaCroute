const Citizen = require("./citizen");
const uuid = require("uuid").v4;
const _ = require("lodash");

const nameList = [
  "Fabriste l'adjoint du maire",
  "Marcello l'appranti boucher",
  "Akim le fils du forgeron",
  "Rob le rigoleur",
  "Yussuf Dagli le fabuleux",
];

let cardCount = 0;
let shuffledNameList;

class MiddleCard extends Citizen {
  constructor() {
    super();
    this.id = uuid();
    this.role = undefined;
    this.initialRole = undefined;
    this.name = shuffledNameList[cardCount];

    cardCount++;
  }

  getName() {
    return this.name;
  }

  static shuffleNames() {
    shuffledNameList = _.shuffle(nameList);
  }
}

module.exports = MiddleCard;
