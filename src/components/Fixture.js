import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import football from '../css/images/football.svg';
import eye from '../css/images/eye.svg';
import '../css/Fixture.css';

class Fixture extends React.Component {
    render() {
        const { home, away, date_match, match_result, selected } = this.props.details;
        const isExpired = Date.parse(date_match) < Date.now();
        const listClass = classNames({
            'Fixture': true,
            'selected': !!selected
        });

        return (
            <li className={listClass}}>
                <div className="fixture-watch">
                    {isExpired ? (
                        <img src={football} className="football" alt="Fixtures is finished" />
                    ) : (
                        <img src={eye} className="eye" alt="Watch this fixture" />
                    )}
                </div>
                <span className="home-team">{home.team}</span>
                {match_result ? match_result : 'v' }
                    <span className="away-team">{away.team}</span>
                <span className="fixture-start-time">{moment(date_match).format('HH:mm')}</span>
            </li>
        );
    }
}

export default Fixture;
