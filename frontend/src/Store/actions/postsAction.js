import * as API from '../../api/api.js';

export const getAllPosts = () => {
	return (dispatch) => {
		dispatch(getPostsBegin());
		return API.posts()
			.then(posts => {
				dispatch(getPostsSuccess(posts.posts));
				return posts.posts;

			})
			.catch(error => dispatch(getPostsErrors(error)));
	};
};

export const getOnePost = (id) => {
	return (dispatch) => {
		dispatch(getPostsBegin());
		return API.getOnePost(id)
			.then(post => {
				dispatch(getOnePostSuccess({post: post.post[0], id: id}))
			})
			.catch(error => {console.log(error)});
	};
};

export const getPostsBegin = () => ({type: 'POSTS_GOT_BEGIN'});
export const getOnePostSuccess = payload => ({type: 'POST_GOT_ONE_SUCCESS', payload: payload});
export const getPostsSuccess = posts => ({type: 'POSTS_GOT_SUCCESS', values: posts});
export const getPostsErrors = error => ({type: 'POSTS_GOT_ERROR', values: { error }});
