import leagues from './data/leagues.json';
import roundsEredivisie from './data/rounds-eredivisie.json';
import roundsLiga from './data/rounds-liga.json';
import roundsPremierLeague from './data/rounds-premier-league.json';
import roundsSerieA from './data/rounds-serie-a.json';

const state = {
    leagues,
    rounds: {
        'eredivisie': roundsEredivisie,
        'liga': roundsLiga,
        'premier-league': roundsPremierLeague,
        'serie-a': roundsSerieA
    },
    fixtures: {}
};

export default state;
