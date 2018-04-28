export class DataService {
  constructor() {
    const WEEKLY_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&apikey=ZL45";
    const MONTHLY_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&apikey=ZL45";
  }

  getGroups() {
    return fetch("groups.json").then(response => response.json());
  }

  getGroupWithQuotes(groupName) {
    let groups = this.getGroups();
    let quotes = [];

    return this.getGroups().then(json => {
      let groups = json;
      let group = null;

      if (groups && groups.length > 0)
        group = groups.find(g => g.name === groupName);

      if (group && group.funds) {
        for (let i = 0; i < funds.length; i++) {
          fetch(`${WEEKLY_URL}&symbol=${symbols[i]}`)
            .then(response => response.json())
            .then(json => quotes.push(json));
        }
      }
    });
  }
}