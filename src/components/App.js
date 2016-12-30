import React from 'react';

import initialState from '../state';
import Picker from './Picker';
import Watch from './Watch';

import '../css/App.css';

class App extends React.Component {

    constructor(params) {
        super();

        this.state = initialState;
    }

    toggleSelectFixture() {
        debugger;
    }

    render() {
        return (
            <div className="App">
                <Picker leagues={this.state.leagues} rounds={this.state.rounds} toggleSelectFixture={this.toggleSelectFixture} />
                <Watch />
            </div>
        );
    }
}

export default App;
