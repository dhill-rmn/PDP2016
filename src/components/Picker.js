import React from 'react';
import { Link, Match } from 'react-router';

import League from './League';
import Round from './Round';
import Fixtures from './Fixtures';

import footballIcon from '../css/images/football.svg';
import reactIcon from '../css/images/react.svg';
import '../css/Picker.css';

class Picker extends React.Component {
    render() {
        return (
            <div className="Picker">
                <div className="Picker-header">
                    <div className="Picker-logo">
                        <Link to="/"></Link>
                        <img src={footballIcon} className="Picker-football" alt="football-logo" />
                        <img src={reactIcon} className="Picker-react" alt="react-logo" />
                    </div>
                    <h2>Dav Hill PDP 2016</h2>
                </div>

                <Match exactly pattern="/" render={() => (
                    <ul className="list list-of-leagues">
                        {this.props.leagues.map((league, index) => <League details={league} key={index} />)}
                    </ul>
                )} />

                <Match exactly pattern="/league/:leagueId" render={({ params, pathname }) => (
                    <ul className="list list-of-rounds">
                        {this.props.rounds[params.leagueId].map((round, index) => <Round details={round} key={index} pathname={pathname} />)}
                    </ul>
                )} />

                <Match exactly pattern="/league/:leagueId/round/:roundId" render={({ params }) => <Fixtures {...this.props} toggleSelectFixture={this.props.toggleSelectFixture} params={params} />} />
            </div>
        );
    }
}

export default Picker
