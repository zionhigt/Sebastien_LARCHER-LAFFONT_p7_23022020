import * as API from '../../api/api.js';

export const getUserProfil = () => {
	return (dispatch) => {
		dispatch(getProfilBegin());
		return API.getProfil()
			.then(profil => {
				dispatch(getProfilSuccess(profil));
				return profil;

			})
			.catch(error => {
				dispatch(getProfilErrors(error));
				window.location = "/?#/signin";
			});
	};
};
export const disconnectUser = () =>{
	return dispatch => {
		dispatch(disconnectBegin());
		API.signout()
		.then(message => {
			dispatch(disconnectSuccess());
			console.log('disconnect');
			window.location = "/?#/signin";
			return message;
		})
		.catch(error => {
			dispatch(disconnectErrors(error));


		});
	}
};

export const getProfilBegin = () => ({type: 'PROFIL_GOT_BEGIN'});
export const getProfilSuccess = profil => ({type: 'PROFIL_GOT_SUCCESS', values: { profil }});
export const getProfilErrors = error => ({type: 'PROFIL_GOT_ERROR', values: { error }});

export const disconnectBegin = () => ({type: 'DISCONNECT_BEGIN'});
export const disconnectSuccess = () => ({type: 'DISCONNECT_SUCCESS', values: {disconnect: true}});
export const disconnectErrors = error => ({type: 'DISCONNECT_ERROR', values: { error }});