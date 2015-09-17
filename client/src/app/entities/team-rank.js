export default class TeamRank {
  constructor() {
    this.played = 0;

    this.wins = 0;
    this.draws = 0;
    this.losses = 0;

    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalsDiff = 0;

    this.points = 0;
  }

  processResult(myGoals, opponentGoals) {
    this.played++;

    // Process game result
    switch (true) {
      case (myGoals > opponentGoals):
        // Win
        this.wins++;
        this.points += 3;
        break;
      case (myGoals < opponentGoals):
        // Loss
        this.losses++;
        break;
      default:
        // Draw
        this.draws++;
        this.points += 1;
    }

    // Process goal count
    this.goalsFor += myGoals;
    this.goalsAgainst += opponentGoals;
    this.goalsDiff = this.goalsFor - this.goalsAgainst;
  }
}
