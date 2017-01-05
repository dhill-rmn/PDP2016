import React from 'react';
import moment from 'moment';

import Fixture from './Fixture';

class Fixtures extends React.Component {

    componentDidMount() {
        const fixtures = this.getFixtures();

        if (!fixtures.length) {
            this.props.fetchFixtures(this.props.params);
        }
    }

    getFixtures() {
        const { fixtures, params } = this.props;

        return (fixtures[params.leagueId] && fixtures[params.leagueId][params.roundId]) || [];
    }

    render() {
        let fixtures = this.getFixtures();

        if (!fixtures.length) {
            return (<p>Loading...</p>);
        }

        fixtures = this.props.sortFixtures([...fixtures])
        fixtures = this.props.splitFixturesToDates(fixtures);

        return (
            <div>
                {Object.keys(fixtures).map((date, index) => {
                    return (
                        <div className="fixture-group" key={index}>
                            <h3 className="fixture-date-heading">{moment(date).format('ddd Do MMMM YYYY')}</h3>
                            <ul className="list list-of-fixtures">
                                {fixtures[date].map((fixture, index) => <Fixture details={fixture} key={index} toggleSelectFixture={this.props.toggleSelectFixture} params={this.props.params} />)}
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Fixtures;
