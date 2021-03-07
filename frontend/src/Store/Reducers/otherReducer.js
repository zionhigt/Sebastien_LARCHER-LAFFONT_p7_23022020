import * as API from '../../api/api.js';

const initialState = {others: [], loading: false};

const userProfilHandler = (state = initialState, action) => {

	
	let nextState
	switch(action.type)
	{
		case 'OTHERS_GOT_BEGIN':
			nextState = 
				{
					...state,
					loading: true
				}
			return nextState || state;

		case 'OTHERS_GOT_SUCCESS':
			nextState = 
				{
					...state,
					others: action.values,
					loading: false

				}
			return nextState || state;


		case 'OTHERS_GOT_ERROR':
			
			return {...action.value.error, loading: false};


		default:
			return nextState || state;
	}
};

export default userProfilHandler;