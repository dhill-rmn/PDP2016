import React from 'react';

import Fixture from './Fixture';

class Fixtures extends React.Component {

    constructor({ params }) {
        super();

        const seasonId = '16-17';
        this.url = `https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/${params.leagueId}/seasons/${seasonId}/rounds/${params.roundId}/matches`;
        this.headers = {
            'X-Mashape-Key': 'PNEI8gw7c5mshUFkvXWwr47y8mPGp1rJHlxjsnwvaZY9kq25N5',
            'Accept': 'application/json'
        };

        this.state = {
            loading: true,
            fixtures: []
        }
    }

    componentWillMount() {
        fetch(this.url, { headers: this.headers })
            .then(function (response) {
                response.json().then(function ({ data }) {
                    this.setState({
                        loading: false,
                        fixtures: data.matches
                    });
                }.bind(this));
            }.bind(this));
    }

    render() {
        if (this.state.loading) {
            return (<p>Loading...</p>);
        }

        const fixtures = [...this.state.fixtures].sort(function (a, b) {
            if (a.date_match === b.date_match) {
                return a.home.team < a.home.team;
            }

            return (Date.parse(a.date_match) < Date.parse(b.date_match)) ? -1 : 1;
        });

        return (
            <ul className="list list-of-fixtures">
                {fixtures.map((fixture, index) => <Fixture details={fixture} key={index} />)}
            </ul>
        );
    }
}

export default Fixtures;
