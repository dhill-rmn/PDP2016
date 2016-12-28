import React from 'react';
import { Match } from 'react-router';

import League from './League';

import footballIcon from '../css/images/football.svg';
import reactIcon from '../css/images/react.svg';
import '../css/Picker.css';

class Picker extends React.Component {
    render() {
        return (
    		<div className="Picker">
                <div className="Picker-header">
                    <div className="Picker-logo">
                        <img src={footballIcon} className="Picker-football" alt="football-logo" />
                        <img src={reactIcon} className="Picker-react" alt="react-logo" />
                    </div>
                    <h2>Dav Hill PDP 2016</h2>
                </div>

                <Match exactly pattern="/" render={() => (
                    <ul className="list-of-leagues">
                        {Object.keys(this.props.leagues).map(key => <League details={this.props.leagues[key]} key={key} id={key} />)}
                    </ul>
                )} />

                <Match pattern="/league/:leaugeId" render={() => (
                    <p>foobar</p>
                )} />
    		</div>
        );
    }
}

export default Picker
