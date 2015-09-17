export default class TeamsService {
  constructor(appConfig, $http) {
    'ngInject';

    this.appConfig = appConfig;
    this.$http = $http;
  }

  getTeams() {
    return new Promise((resolve, reject) => {
      this.$http.get(this.appConfig.apiUrl + 'teams').then((results) => {
        if (results.status !== 200 || !(results.data instanceof Array)) {
          reject('Can not get the teams.');
        }

        resolve(results.data);
      }, reject);
    });
  }
}
