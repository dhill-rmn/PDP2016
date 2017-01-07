import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import football from '../css/images/football.svg';
import whistle from '../css/images/whistle.svg';
import eye from '../css/images/eye.svg';
import '../css/Fixture.css';

class Fixture extends React.Component {
    render() {
        const { home, away, date_match, match_result, selected } = this.props.details;
        const now = moment();
        const isExpired = Date.parse(date_match) < now;
        const inProgress = isExpired && moment(date_match).add(2, 'hours').isAfter(now);
        const listClass = classNames({
            'Fixture': true,
            'selected': !!selected
        });

        return (
            <li className={listClass} onClick={this.props.onClick}>
                <div className="fixture-watch">
                    {isExpired && !inProgress ? (
                        <img src={football} className="football" alt="Fixture is finished" />
                    ) : inProgress ? (
                        <img src={whistle} className="whistle" alt="Fixture is in progress" />
                    ) : (
                        <img src={eye} className="eye" alt="Watching this fixture" />
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
