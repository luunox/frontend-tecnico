import { types } from '.';

export const setList = (list = []) => {
	return (dispatch) => {
		dispatch({ type: types.SET_LIST, payload: list });
	};
};

export const setFile = (file = {}) => {
	return (dispatch) => {
		dispatch({ type: types.SET_FILE, payload: file });
	};
};

export const setAll = (data = []) => {
	return (dispatch) => {
		dispatch({ type: types.SET_ALL_DATA, payload: data });
	};
};
