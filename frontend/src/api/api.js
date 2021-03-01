import 'babel-polyfill'

export async function signup(body){

	const request = await fetch('http://localhost:3001/api/auth/signup', 
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	);

	return request.json();
	

};

export async function signin(body){

	const request = await fetch('http://localhost:3001/api/auth/signin', 
		{
			method: "POST",
			body: JSON.stringify(body),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	);

	return request.json();
	

};

export async function posts(){

	const request = await fetch('http://localhost:3001/api/posts', {credentials: 'include'});
	return request.json();

};
export async function getOnePost(id){

	const request = await fetch(`http://localhost:3001/api/posts/${id}`, {credentials: 'include'});
	return request.json();

};

export async function other(){

	const request = await fetch('http://localhost:3001/api/others', {credentials: 'include'});

	return request.json();
	

};

export async function getCommentByPostId(id){

	const request = await fetch(`http://localhost:3001/api/comments/${id}`, {credentials: 'include'});

	return request.json();
	

};

export async function signout(){

	const request = await fetch('http://localhost:3001/api/auth/signout', {credentials: 'include'});

	return request.json();
	

};

export async function getProfil(){
	const request = await fetch('http://localhost:3001/api/auth/profil', {credentials: 'include'});

	return request.json();
	

};

export async function sendComment(body){

	const request = await fetch('http://localhost:3001/api/comments', 
		{
			method: "POST",
			body: JSON.stringify(body),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	);

	return request.json();
	

};

export async function setProfil(body){

	const request = await fetch('http://localhost:3001/api/auth/profil', 
		{
			method: "PUT",
			body: body,
			credentials: 'include',
			headers: {                           
  				"x-Content-Type": "multipart/form-data"    
 			} 		
 		}
	);

	return request.json();
	

};

export async function postOne(body){
	console.log(body)
	const request = await fetch('http://localhost:3001/api/posts', 
		{
			method: "post",
			body: body,
			credentials: 'include',
			headers: {                           
  				"x-Content-Type": "multipart/form-data"    
 			} 		
 		}
	);

	return request.json();
	

};

export async function likePost(like, id){

	const request = await fetch(`http://localhost:3001/api/posts/like/${id}`, 
		{
			method: "POST",
			body: JSON.stringify({ like }),
			credentials: 'include',
			headers: {                           
  				"Content-Type": "application/json"    
 			} 		
 		}
	);
	console.log(request)
	return request.json();
	

};