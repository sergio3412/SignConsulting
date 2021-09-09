
var contador=0;
var nomeGrupo=[];
var idGrupo=[];
var emailUsuario=[];




var contadorGrupo=0;
var contadorPorEmails=0;

var controlImp=0;


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
      emailUsuario[i]=response.userInfoList[i].email;//listar emails e salvar no array
    }
 
  })
  .catch(error => {
    console.error(error);
  });
}

getUsers();








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

    for(var k=0;k< response.groupInfoList.length; k++){
      nomeGrupo[k]=response.groupInfoList[k].groupName;//listar nome de grupo e id e salvar no array
      idGrupo[k]=response.groupInfoList[k].groupId;
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

    //IMPRIMIR GRUPOS
    for(var j=0;j<nomeGrupo.length;j++){//NOME GRUPO
      var html = "<tr>";
         
          html +="<td class="+"coluna"+">"+nomeGrupo[j]+"</td>";
            
              //CONTAR ACORDOS POR GRUPO 
              contador=0;
              for(var z=0;z< response.userAgreementList.length; z++){
                if(response.userAgreementList[z].groupId==idGrupo[j]){                    
                    contadorGrupo++;
                }
              }//FIM CONTAR POR GRUPO
              html +="<td class="+"coluna"+">"+contadorGrupo+" Acuerdos en el grupo</td>"; //adicionar valor contado por grupos
      
          html +="</tr>";//FIM NOME GRUPOS

        //IMPRIMIR EMAILS
       controlImp=0;
        for(var y=0;y<emailUsuario.length;y++){
          
          var auxConteudo="";
          html +="</tr>";
          for(var x=0;x< response.userAgreementList.length; x++){
           
            if(response.userAgreementList[x].groupId==idGrupo[j]){
              var emailAgr=response.userAgreementList[x].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].email;
              
                if(emailAgr==emailUsuario[y]){//contar emails por grupo
                
                    controlImp++;
                    auxConteudo=emailAgr;
                  
                }

            }
                
          }
          if(controlImp!=0 && auxConteudo!=""){
           html +="<td>"+auxConteudo+"</td>";
           html +="<td>"+controlImp+"</td>";
          }
          
        html +="</tr>";
        
        }

        $('table tbody').append(html);
    }

  })
  .catch(error => {
    console.error(error);
  });
}

getAgreements();

