import React from 'react';

import initialState from '../state';
import Picker from './Picker';
import Watch from './Watch';
import base from '../base';

import '../css/App.css';

class App extends React.Component {

    constructor(params) {
        super();

        this.headers = {
            'X-Mashape-Key': 'PNEI8gw7c5mshUFkvXWwr47y8mPGp1rJHlxjsnwvaZY9kq25N5',
            'Accept': 'application/json'
        };

        this.fetchFixtures = this.fetchFixtures.bind(this);
        this.toggleSelectFixture = this.toggleSelectFixture.bind(this);

        this.state = initialState;
    }

    componentWillMount() {
        this.ref = base.syncState('dav/selections', {
            context: this,
            state: 'selections'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    fetchFixtures(params) {
        const seasonId = '16-17';
        const url = `https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/${params.leagueId}/seasons/${seasonId}/rounds/${params.roundId}/matches`;

        fetch(url, { headers: this.headers })
            .then(function (response) {
                response.json().then(function ({ data }) {
                    const { selections } = this.state;
                    let fixtures = {...this.state.fixtures};
                    fixtures[params.leagueId] = fixtures[params.leagueId] || {};
                    fixtures[params.leagueId][params.roundId] = data.matches.map(match => {
                        match.selected = !!selections[match.identifier] || false;

                        return match;
                    });

                    this.setState({ fixtures });
                }.bind(this));
            }.bind(this));
    }

    toggleSelectFixture(match, params) {
        const fixtures = {...this.state.fixtures};
        const selections = {...this.state.selections};
        const matches = fixtures[params.leagueId][params.roundId];
        const index = matches.indexOf(match);

        const fixture = fixtures[params.leagueId][params.roundId][index] = {
            ...matches[index],
            selected: !(matches[index].selected || false)
        };

        if (fixture.selected) {
            selections[matches[index].identifier] = fixture;
        } else {
            selections[matches[index].identifier] = null;
        }

        this.setState({
            fixtures,
            selections
        });
    }

    sortFixtures(fixtures = []) {
        return fixtures.sort((a, b) => {
            if (a.date_match === b.date_match) {
                return a.home.team < b.home.team ? -1 : 1;
            }

            return (Date.parse(a.date_match) < Date.parse(b.date_match)) ? -1 : 1;
        });
    }

    splitFixturesToDates(fixtures = []) {
        return fixtures.reduce((prev, fixture) => {
            let date = new Date(fixture.date_match);
            date.setHours(0);
            date.setMinutes(0);
            date = date.toISOString();

            prev[date] = prev[date] || [];
            prev[date].push(fixture);

            return prev;
        }, {});
    }

    render() {
        return (
            <div className="App">
                <Picker leagues={this.state.leagues} rounds={this.state.rounds} fixtures={this.state.fixtures} fetchFixtures={this.fetchFixtures} toggleSelectFixture={this.toggleSelectFixture} sortFixtures={this.sortFixtures} splitFixturesToDates={this.splitFixturesToDates} />
                <Watch selections={this.state.selections} sortFixtures={this.sortFixtures} splitFixturesToDates={this.splitFixturesToDates} />
            </div>
        );
    }
}

export default App;
