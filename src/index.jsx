import './index.css';
import React from 'react';
import store from './app/store';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<HomePage />
		</Provider>
	</React.StrictMode>
);
