import * as API from '../../api/api.js';

const initialState = {userProfil: {}, loading: false};

const userProfilHandler = (state = initialState, action) => {

	
	let nextState
	switch(action.type)
	{
		case 'PROFIL_GOT_BEGIN':
			nextState = 
				{
					...state,
					loading: true
				}
			return nextState || state;

		case 'PROFIL_GOT_SUCCESS':

			nextState = 
				{
					...state,
					userProfil:(action.values.profil.length) ? action.values.profil[0] : action.values.profil,
					loading: false

				}
			return nextState || state;


		case 'PROFIL_GOT_ERROR':
			
			return {userProfil: {}, loading: false};


		case 'DISCONNECT_BEGIN':
			nextState = 
				{
					...state,
					loading: true
				}
			return nextState || state;

		case 'DISCONNECT_SUCCESS':

			nextState = 
				{
					...state,
					userProfil:{},
					loading: false

				}
			return nextState || state;


		case 'DISCONNECT_ERROR':
			
			return {loading: false};


		default:
			return nextState || state;
	}
};

export default userProfilHandler;