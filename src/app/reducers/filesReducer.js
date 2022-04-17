import { types } from '../actions';

const initialState = {
	list: [],
	allData: [],
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SET_LIST:
			return { ...state, list: payload };

		case types.SET_FILE:
			return { ...state, allData: [...state.allData, payload] };

		case types.SET_ALL_DATA:
			return { ...state, allData: payload };

		default:
			return state;
	}
};

export default reducer;
