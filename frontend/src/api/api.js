import 'babel-polyfill'

export async function signup(body){

	return await fetch('http://localhost:3001/api/auth/signup', 
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function signin(body){

	return await fetch('http://localhost:3001/api/auth/signin', 
		{
			method: "POST",
			body: JSON.stringify(body),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	)
	.then(res => res.json());
	

};

export async function posts(){

	return await fetch('http://localhost:3001/api/posts', {credentials: 'include'})
	.then(handleErrors).then(res => res.json());

};
export async function getOnePost(id){

	return await fetch(`http://localhost:3001/api/posts/${id}`, {credentials: 'include'})
	.then(handleErrors).then(res => res.json());

};


export async function deleteOnePost(id){

	return await fetch(`http://localhost:3001/api/posts/${id}`, {method: "DELETE", credentials: 'include'})
	.then(handleErrors).then(res => res.json());

};


export async function getOthers(){

	return await fetch('http://localhost:3001/api/others', {credentials: 'include'})
	.then(handleErrors).then(res => res.json());
	

};

export async function getCommentByPostId(id){

	return await fetch(`http://localhost:3001/api/comments/${id}`, {credentials: 'include'})
	.then(handleErrors).then(res => res.json());
	

};

export async function killMe(){

	return await fetch('http://localhost:3001/api/auth/killMe', {method: "DELETE", credentials: 'include'})
	.then(handleErrors).then(res => res.json());
	

};

export async function signout(){

	return await fetch('http://localhost:3001/api/auth/signout', {credentials: 'include'})
	.then(handleErrors).then(res => res.json());
	

};

export async function getProfil(){
	return await fetch('http://localhost:3001/api/auth/profil', {credentials: 'include'})
	.then(handleErrors).then(res => res.json());
	

};

export async function sendComment(body){

	return await fetch('http://localhost:3001/api/comments', 
		{
			method: "POST",
			body: JSON.stringify(body),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function updateOneComment(body, id){

	return await fetch(`http://localhost:3001/api/comments/${id}`, 
		{
			method: "PUT",
			body: JSON.stringify({text: body}),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function setProfil(body){

	return await fetch('http://localhost:3001/api/auth/profil', 
		{
			method: "PUT",
			body: body,
			credentials: 'include',
			headers: {                           
  				"x-Content-Type": "multipart/form-data"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function postOne(body){
	return await fetch('http://localhost:3001/api/posts', 
		{
			method: "post",
			body: body,
			credentials: 'include',
			headers: {                           
  				"x-Content-Type": "multipart/form-data"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function updateOnePost(body, id){

	return await fetch(`http://localhost:3001/api/posts/${id}`, 
		{
			method: "PUT",
			body: body,
			credentials: 'include',
			headers: {                           
  				"x-Content-Type": "multipart/form-data"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function likePost(like, id){

	return await fetch(`http://localhost:3001/api/posts/like/${id}`, 
		{
			method: "POST",
			body: JSON.stringify({ like }),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function likeComment(like, id){

	return await fetch(`http://localhost:3001/api/comments/like/${id}`, 
		{
			method: "POST",
			body: JSON.stringify({ like }),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	)
	.then(handleErrors).then(res => res.json());
	

};

export async function deleteComment(id){

	return await fetch(`http://localhost:3001/api/comments/${id}`, {method: "DELETE", credentials: 'include'})
	.then(handleErrors).then(res => res.json());

};


const handleErrors = response => {

	if(!response.ok)
	{
		throw Error(response.statusText);
	}
	return response;
};