import React from 'react';

import initialState from '../state';
import Picker from './Picker';
import Watch from './Watch';

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

    fetchFixtures(params) {
        const seasonId = '16-17';
        const url = `https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/${params.leagueId}/seasons/${seasonId}/rounds/${params.roundId}/matches`;

        fetch(url, { headers: this.headers })
            .then(function (response) {
                response.json().then(function ({ data }) {
                    let fixtures = {...this.state.fixtures};
                    fixtures[params.leagueId] = fixtures[params.leagueId] || {};
                    fixtures[params.leagueId][params.roundId] = data.matches;

                    this.setState({ fixtures });
                }.bind(this));
            }.bind(this));
    }

    toggleSelectFixture(match, params) {
        const { fixtures } = this.state;
        const matches = fixtures[params.leagueId][params.roundId];
        const index = matches.indexOf(match);
        const updatedFixtures = {
            ...fixtures,
            [params.leagueId]: {
                [params.roundId]: [
                    ...matches.slice(0, index),
                    {...matches[index], selected: !(matches[index].selected || false)},
                    ...matches.slice(index + 1)
                ]
            }
        };

        this.setState({ fixtures: updatedFixtures });
    }

    render() {
        return (
            <div className="App">
                <Picker leagues={this.state.leagues} rounds={this.state.rounds} fixtures={this.state.fixtures} toggleSelectFixture={this.toggleSelectFixture} fetchFixtures={this.fetchFixtures} />
                <Watch />
            </div>
        );
    }
}

export default App;
