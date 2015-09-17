import League from '../entities/league.js';

class LeagueDirective {
  constructor () {
    let directive = {
      restrict: 'E',
      templateUrl: 'app/views/league.html',
      scope: true,
      controller: LeagueController,
      controllerAs: 'leagueCtrl',
      bindToController: true
    };

    return directive;
  }
}

class LeagueController {
  constructor($log, $scope, TeamsService, GamesService) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.TeamsService = TeamsService;
    this.GamesService = GamesService;

    // Initialize the teams
    this.league = new League();
    this.getTeams()
      .then(() => {
        this.$scope.$digest();
        this.bindToScores();
      });
  }

  getTeams() {
    return this.TeamsService.getTeams().then((teams) => {
      this.league.setTeams(teams);
    }, (err) => {
      this.$log.error('Can not get the teams.', err);
    });
  }

  bindToScores() {
    this.GamesService.subscribe((game) => {
      this.league.processGame(game);
      this.$scope.$digest();
    });
  }
}

export default LeagueDirective;
