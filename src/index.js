import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';

import './css/index.css';

const Root = () => {
    return (
		<BrowserRouter>
			<div>
				<Match pattern="/" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render(<Root />, document.getElementById('root'));
