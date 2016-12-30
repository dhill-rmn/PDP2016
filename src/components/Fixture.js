import React from 'react';
import moment from 'moment';

import eye from '../css/images/eye.svg';
import '../css/Fixture.css';

class Fixture extends React.Component {
    render() {
        const { home, away, date_match } = this.props.details;

        return (
            <li className="Fixture" onClick={() => { this.props.toggleSelectFixture(this.props.details) }}>
                <div className="fixture-watch">
                    <img src={eye} alt="Watch this fixture" />
                </div>
                <span className="home-team">{home.team}</span>
                v
                <span className="away-team">{away.team}</span>
                <span className="fixture-start-time">{moment(date_match).format('HH:mm')}</span>
            </li>
        );
    }
}

export default Fixture;
