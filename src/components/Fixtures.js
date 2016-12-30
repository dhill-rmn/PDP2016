import React from 'react';
import moment from 'moment';

import Fixture from './Fixture';

class Fixtures extends React.Component {

    constructor(props) {
        super();

        this.props = props;

        const params = this.props.params;
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

    componentDidMount() {
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

    sortFixtures(fixtures = []) {
        return fixtures.sort((a, b) => {
            if (a.date_match === b.date_match) {
                return a.home.team < a.home.team;
            }

            return (Date.parse(a.date_match) < Date.parse(b.date_match)) ? -1 : 1;
        });
    }

    splitFixturesToDates(fixtures = []) {
        return fixtures.reduce((prev, fixture, i, array) => {
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
        if (this.state.loading) {
            return (<p>Loading...</p>);
        }

        let fixtures = this.sortFixtures([...this.state.fixtures])
        fixtures = this.splitFixturesToDates(fixtures);

        return (
            <div>
                {Object.keys(fixtures).map((date, index) => {
                    return (
                        <div className="fixture-group" key={index}>
                            <h3 className="fixture-date-heading">{moment(date).format('ddd Do MMMM YYYY')}</h3>
                            <ul className="list list-of-fixtures">
                                {fixtures[date].map((fixture, index) => <Fixture details={fixture} key={index} toggleSelectFixture={this.props.toggleSelectFixture} />)}
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Fixtures;
