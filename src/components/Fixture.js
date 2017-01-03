import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import eye from '../css/images/eye.svg';
import '../css/Fixture.css';

class Fixture extends React.Component {
    render() {
        const { home, away, date_match, selected } = this.props.details
        const listClass = classNames({
            'Fixture': true,
            'selected': !!selected
        });

        return (
            <li className={listClass} onClick={() => { this.props.toggleSelectFixture(this.props.details, this.props.params) }}>
                <div className="fixture-watch">
                    <svg className="icon"><use xlinkHref={`${eye}#Layer_1`}></use></svg>
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
