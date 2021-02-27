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

export async function other(){

	const request = await fetch('http://localhost:3001/api/others', {credentials: 'include'});

	return request.json();
	

};

export async function getCommentByPostId(id){

	const request = await fetch('http://localhost:3001/api/comments/'+id, {credentials: 'include'});

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