import React from 'react';
import { Link } from 'react-router';

import Flags from './flags';

class League extends React.Component {
    render() {
        const { league_slug, name, nation } = this.props.details;

        return (
            <li className="League">
                <Link to={`/league/${league_slug}`}>
                    <img className="country-flag" src={Flags[nation]} alt={`Country flag of ${nation}`} />
                    {name}
                    <span className="chevron">&rsaquo;</span>
                </Link>
            </li>
        );
    }
}

export default League;
