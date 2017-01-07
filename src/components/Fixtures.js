import React from 'react';
import moment from 'moment';

import Fixture from './Fixture';

class Fixtures extends React.Component {

    componentDidMount() {
        const fixtures = this.props.fixtures;

        if (!fixtures.length) {
            this.props.fetchFixtures();
        }
    }

    render() {
        let fixtures = this.props.fixtures;

        if (!fixtures.length) {
            return (<p>Loading...</p>);
        }

        fixtures = this.props.splitFixturesToDates([...fixtures]);

        return (
            <div>
                {Object.keys(fixtures).map((date, index) => {
                    return (
                        <div className="fixture-group" key={index}>
                            <h3 className="fixture-date-heading">{moment(date).format('ddd Do MMMM YYYY')}</h3>
                            <ul className="list list-of-fixtures">
                                {fixtures[date].map((fixture, index) => <Fixture details={fixture} key={index} onClick={() => { this.props.toggleSelectFixture(fixture) }} />)}
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Fixtures;
