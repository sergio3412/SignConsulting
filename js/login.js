
var form = document.getElementById('formulario');
var emailLogin = document.getElementById('emailLogin');
var senhaLogin = document.getElementById('senhaLogin');
form.addEventListener('submit', function(e) {
    //impede o envio do form

e.preventDefault();


function getUsers() {
const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 3AAABLblqZhBf0V9GQArO67enaG_0pr2Q4vL2ozAqOEveOjO0aK-yGO_c1C0TDQlN0QBznfUuEIRYwwDasLyckHalRpBopPTn'
});

return fetch('https://api.na4.echosign.com/api/rest/v6/users', {
  method: 'GET',
  headers: myHeaders,
})

.then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .then(response => {
   for(var i=0;i< response.userInfoList.length; i++){
        //validar email e senha(id)
      	if (response.userInfoList[i].email==emailLogin.value && response.userInfoList[i].id==senhaLogin.value) {
      		//redirecionar para a página inicio.html
      		window.location.replace("inicio.html");
        }
	 }
   
  
  })
  .catch(error => {
    console.error(error);
  });
}

getUsers();
   
});

