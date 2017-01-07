import React from 'react';
import moment from 'moment';

import Fixture from './Fixture';
import '../css/Watch.css';

class Watch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selections: this.organizeWatchedFixtures({...props.selections})
        };
    }

    componentWillReceiveProps(nextProps) {
        const selections = this.organizeWatchedFixtures({...nextProps.selections});

        this.setState({ selections });
    }

    organizeWatchedFixtures(fixtures = {}) {
        const now = moment();
        const selections = Object.keys(fixtures).reduce((prev, matchId) => {
            const fixture = fixtures[matchId];
            let date = moment(fixture.date_match);

            if (date.isBefore(now)) {
                if (date.add(2, 'hours').isBefore(now)) {
                    prev.Finished.push(fixture);
                } else {
                    prev['In Progress'].push(fixture);
                }
            } else if (date.isAfter(now)) {
                prev.Upcoming.push(fixture);
            }

            return prev;
        }, {
            Finished: [],
            'In Progress': [],
            Upcoming: []
        });

        selections.Finished = this.props.sortFixtures(selections.Finished);
        selections['In Progress'] = this.props.sortFixtures(selections['In Progress']);
        selections.Upcoming = this.props.sortFixtures(selections.Upcoming);

        selections.Finished = this.props.splitFixturesToDates(selections.Finished);
        selections['In Progress'] = this.props.splitFixturesToDates(selections['In Progress']);
        selections.Upcoming = this.props.splitFixturesToDates(selections.Upcoming);

        return selections;
    }

    renderEmpty(category) {
        return (
            <p>You are not watching any fixtures that are currently {category}</p>
        )
    }

    render() {
        const { selections } = this.state;

        return (
            <div className="Watch">
                {Object.keys(selections).map((category, index) => {
                    return (
                        <div className="watch-category" key={index}>
                            <h2 className="watch-category-heading">{category}</h2>
                            {Object.keys(selections[category]).length ?
                                Object.keys(selections[category]).map((date, index) => {
                                    return (
                                        <div className="fixture-group" key={index}>
                                            <h5 className="fixture-date-heading">{moment(date).format('ddd Do MMMM YYYY')}</h5>
                                            <ul className="list list-of-fixtures">
                                                {selections[category][date].map((fixture, index) => <Fixture details={fixture} key={index} onClick={() => this.props.removeFixture(fixture.identifier)} />)}
                                            </ul>
                                        </div>
                                    )
                                }) : this.renderEmpty(category)}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Watch
