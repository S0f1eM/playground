import { FETCH_DATA } from '../actions/types';

export default (state=[], action) => {

	switch(action.type) {
		case FETCH_DATA:
		const newState = Object.assign({...state}, action.payload.data);
			return newState;

		default:
			return state;
	}

}
