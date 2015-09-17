import 'babel-core/polyfill';

import config from './index.config';
import routerConfig from './index.route';

import appConfig from './app.config.js';

import MainController from './main/main.controller';
import TeamsService from './services/teams.js';
import GamesService from './services/games.js';
import NavbarDirective from '../app/components/navbar/navbar.directive.js';
import LeagueDirective from './directives/league.js';

angular.module('client', ['ui.router', 'ui.bootstrap'])
  .config(config)
  .config(routerConfig)

  .value('appConfig', appConfig)

  .controller('MainController', MainController)
  .service('TeamsService', TeamsService)
  .service('GamesService', GamesService)
  .directive('navbar', () => new NavbarDirective())
  .directive('league', () => new LeagueDirective());
