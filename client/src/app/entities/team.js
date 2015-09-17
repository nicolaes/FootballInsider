import TeamRank from './team-rank.js';

export default class Team {
  constructor(team) {
    this.id = team.id;
    this.name = team.name;
    this.rank = this.getRank();
  }

  getRank() {
    return new TeamRank();
  }
}
