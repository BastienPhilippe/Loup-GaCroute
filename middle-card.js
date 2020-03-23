const Citizen = require("./citizen")

class MiddleCard extends Citizen {
    constructor(name) {
        super()
        this.role = undefined;
        this.initialRole = undefined;
        this.name = name;
    }

     getName() {
        return this.name
     }
}

module.exports = MiddleCard;