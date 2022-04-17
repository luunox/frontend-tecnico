import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import HomePage from '../../pages/HomePage';
import tableToObj from '../utils/tableToObj';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.setTimeout(15000);
global.IS_REACT_ACT_ENVIRONMENT = true;

let list = global.fileList;
let allData = global.allData.sort((a, b) => (a.file === b.file ? 0 : a.file > b.file ? 1 : -1));
let store = mockStore({});
let container = document.createElement('div');

beforeEach(() => {
	const allReducers = { files: { list, allData } };
	store = mockStore(allReducers);
	container = document.createElement('div');
	document.body.appendChild(container);
	act(() =>
		ReactDOM.createRoot(container).render(
			<Provider store={store}>
				<HomePage />
			</Provider>
		)
	);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

describe('Table', () => {
	it('rows length shoul be number', () => {
		const rows = container.querySelector('tbody').rows;
		expect(rows.length).toBeNumber;
	});

	it('every row should have 4 params', async () => {
		const rows = container.querySelector('tbody').rows;

		for (let index = 0; index < rows.length; index++) {
			const cels = rows[index].cells;
			expect(cels.length).toBe(4);
		}
	});
});

describe('Table rows', () => {
	it.each(allData)('$file should have more than 1 success line', async ({ file, lines }) => {
		const table = container.querySelector('table');
		const objTa = tableToObj(table);
		const row = objTa.find((val) => (val.file = file));

		expect(row.lines.length).toBeGreaterThan(0);
	});
});
