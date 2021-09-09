var form = document.getElementById('formularioBuscar');
var grupoBusc = document.getElementById('grupoBusc');
var userBusc = document.getElementById('userBusc');
form.addEventListener('submit', function(e) {
  //Valores para realziar a pesquisa
  var nomeGrupo=grupoBusc.value;
  var nomeUser=userBusc.value;
  
e.preventDefault();

var idGrupo="";
var contador=0;

function getGroups() {
const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 3AAABLblqZhBf0V9GQArO67enaG_0pr2Q4vL2ozAqOEveOjO0aK-yGO_c1C0TDQlN0QBznfUuEIRYwwDasLyckHalRpBopPTn'
});

return fetch('https://api.na4.echosign.com/api/rest/v6/groups', {
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

    for(var i=0;i< response.groupInfoList.length; i++){

      if (response.groupInfoList[i].groupName==nomeGrupo) {
        idGrupo = response.groupInfoList[i].groupId;//encontrar o idGroup a partir do nome do Grupo 
      }      
}
 

  })
  .catch(error => {
    console.error(error);
  });
}

getGroups();


function getAgreements() {
const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 3AAABLblqZhBf0V9GQArO67enaG_0pr2Q4vL2ozAqOEveOjO0aK-yGO_c1C0TDQlN0QBznfUuEIRYwwDasLyckHalRpBopPTn'
});

return fetch('https://api.na4.echosign.com/api/rest/v6/agreements', {
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

    for(var i=0;i< response.userAgreementList.length; i++){
  
      var html = "<tr>";
      if (response.userAgreementList[i].groupId==idGrupo){
        if(response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].fullName==nomeUser){
        
        html +="<td>"+response.userAgreementList[i].type+"</td>";  
        html +="<td>"+response.userAgreementList[i].name+"</td>";
       
        html +="<td>"+response.userAgreementList[i].displayDate+"</td>";  

        html +="<td>"+response.userAgreementList[i].status+"</td>";  
 
        html +="<td>"+response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].fullName+"</td>";
        html +="<td>"+response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].email+"</td>";
        html +="<td>"+response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].company+"</td>";

        html +="</tr>";

        $('table tbody').append(html);
        contador=contador+1;
        }
      }
  }
  $('#nroRegistros').append(contador);
 
  
  })
  .catch(error => {
    console.error(error);
  });
}

getAgreements();


})//fim addEventListener