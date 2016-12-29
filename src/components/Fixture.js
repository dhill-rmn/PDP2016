import React from 'react';
import moment from 'moment';

import '../css/Fixture.css';

class Fixture extends React.Component {
    render() {
        const { home, away, date_match } = this.props.details;

        return (
            <li className="Fixture">
                <span className="home-team">{home.team}</span>
                <span className="fixture-start-time">({moment(date_match).format('ddd HH:mm')})</span>
                <span className="away-team">{away.team}</span>
            </li>
        );
    }
}

export default Fixture;
