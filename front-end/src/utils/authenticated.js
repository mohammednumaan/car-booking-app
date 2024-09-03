export default async function isAuthenticated(){
    let response = await fetch('http://localhost:3000/users/authenticated', {
        mode: 'cors',
        credentials: 'include'
    })
    
    let jsonData = await response.json();
    return jsonData
    
}