import * as API from '../../api/api.js';

const initialState = {posts: [], loading: false};

const postsHandler = (state = initialState, action) => {


	let nextState
	switch(action.type)
	{

		case 'POSTS_GOT_BEGIN':
			nextState = 
				{
					...state,
					loading: true
				}
			return nextState || state;

		case 'POST_GOT_ONE_SUCCESS':
			let old_post = {};
			state.posts.forEach(p => {
				if(p.id == parseInt(action.payload.id))
				{
					old_post = p;
				}
			});
			const indexOfPost = state.posts.indexOf(old_post);
			let newPosts = state.posts;
			newPosts.splice(indexOfPost, 1, action.payload.post);
			nextState = {
				...state,
				...newPosts
			}

			return nextState || state;

		case 'POSTS_GOT_SUCCESS':
			nextState = 
				{
					...state,
					posts: action.values,
					loading: false
				}
			return nextState || state;


		case 'POSTS_GOT_ERROR':
			
			return action.value.error;


		default:
			return nextState || state;
	}
};

export default postsHandler;