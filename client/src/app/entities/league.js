import Team from './team.js';

export default class League {
  constructor() {
    this.teams = [];
    this.rankingAttrs = [
      'points',
      'goalsDiff',
      'goalsFor'
    ];
    this.compareTeams = this.compareTeams.bind(this);
  }

  setTeams(teams) {
    this.teams = teams.map((team) => new Team(team));
  }

  processGame(game) {
    // Find the team objects
    let [homeTeam, awayTeam] = this.getHomeAwayTeamsByGame(game);
    if (homeTeam === null || awayTeam === null) {
      throw ('Invalid teams');
    }

    // Process the results for both teams
    let homeGoals = parseInt(game.homeGoals);
    let awayGoals = parseInt(game.awayGoals);
    homeTeam.rank.processResult(homeGoals, awayGoals);
    awayTeam.rank.processResult(awayGoals, homeGoals);

    // Recompute the rankings
    this.teams.sort(this.compareTeams);
    // {"date":"24/09/11","homeTeamId":15,"awayTeamId":3,"homeGoals":"0","awayGoals":"0"}
  }
  
  getHomeAwayTeamsByGame(game) {
    let homeTeam = null, awayTeam = null;
    for (let i = 0; i < this.teams.length; i++) {
      // Match the team IDs
      if (game.homeTeamId === this.teams[i].id) {
        homeTeam = this.teams[i];
      } else if (game.awayTeamId === this.teams[i].id) {
        awayTeam = this.teams[i];
      } else {
        continue;
      }

      // Break the loop as soon as a team is found
      if (homeTeam !== null && awayTeam !== null) {
        break;
      }
    }

    return [homeTeam, awayTeam];
  }

  compareTeams(team1, team2) {
    // Rank the teams by the first attribute that's different, in *descending* order
    for (let i = 0; i < this.rankingAttrs.length; i++) {
      let attr = this.rankingAttrs[i];
      if (team1.rank[attr] > team2.rank[attr]) {
        return -1;
      } else if (team1.rank[attr] < team2.rank[attr]) {
        return 1;
      }
    }


    // If all attributes are the same, rank by name (alphabetical/ascending order)
    if (team1.name > team2.name) {
      return 1;
    }
    if (team1.name < team2.name) {
      return -1;
    }
    return 0;
  }
}
