import * as API from '../../api/api.js';

export const getOthers = () => {
	return (dispatch) => {
		dispatch(getOthersBegin());
		return API.getOthers()
			.then(others => {
				dispatch(getOthersSuccess(others));
				return others;

			})
			.catch(error => dispatch(getOthersErrors(error)));
	};
};

export const getOthersBegin = () => ({type: 'OTHERS_GOT_BEGIN'});
export const getOthersSuccess = others => ({type: 'OTHERS_GOT_SUCCESS', values: others});
export const getOthersErrors = error => ({type: 'OTHERS_GOT_ERROR', values: { error }});
