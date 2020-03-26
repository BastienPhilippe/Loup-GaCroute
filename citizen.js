class Citizen {
  switchRole(otherCitizen) {
    const futureRole = otherCitizen.role;
    otherCitizen.role = this.role;
    this.role = futureRole;
  }

  getName() {
    if (this.member) {
      return this.member.nickname
        ? this.member.nickname
        : this.member.user.username;
    }
  }

  sendRole(player) {
    if (!player) {
      this.sendDM(`Vous êtes **${this.role.name}**`);
    } else {
      player.sendDM(`${this.getName()} est **${this.role.name}**`);
    }
  }

  assignRole(Role) {
    this.role = new Role();
    this.initialRole = new Role();
  }

  async nightAction(game) {
    return await this.initialRole.nightAction(game, this);
  }
}

module.exports = Citizen;
