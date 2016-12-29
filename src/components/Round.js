import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class Round extends React.Component {
    render() {
        const { round_slug, name, start_date } = this.props.details;
        const isExpired = Date.parse(start_date) < Date.now();

        if (isExpired) {
            return null;
        }

        return (
            <li className="Round">
                <Link to={`${this.props.pathname}/round/${round_slug}`}>
                    {name} <span className="round-start-date">({moment(start_date).format('DD/MM/YYYY')})</span>
                    <span className="chevron">&rsaquo;</span>
                </Link>
            </li>
        );
    }
}

export default Round;
