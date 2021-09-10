
var nomeGrupo=[]; //salvar no array todos os nomes dos grupos
var idGrupo=[];  //salvar no array os codigos dos grupos para buscar depois nos acordos
var emailUsuario=[]; //salvar no array todos os e-mails dos usuarios
var somaTotal=0;//total de transações dos grupos
var contadorGrupo=0; //contador de transações por grupo
var controlImp=0;//contador de transações por Emails


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


/* FUNÇÃO PARA SALVAR NO ARRAY NOMES E CONDIGOS DOS GRUPOS */
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


/* FUNÇÃO PARA BUSCAR GRUPOS E EMAILS NA LISTA DE ACORDOS*/

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
var html="";
    //IMPRIMIR GRUPOS
    for(var j=0;j<nomeGrupo.length;j++){//NOME GRUPO
      
       html = "<tr>";
         
          html +="<td class="+"coluna"+">"+nomeGrupo[j]+"</td>";
            
              //CONTAR ACORDOS POR GRUPO 
              
              contadorGrupo=0;//zerar o contadorGroup para contagem de outro grupo
              for(var z=0;z< response.userAgreementList.length; z++){
                if(response.userAgreementList[z].groupId==idGrupo[j]){                    
                    contadorGrupo++;
                }
              }//FIM CONTAR POR GRUPO
              somaTotal=somaTotal+contadorGrupo;
              html +="<td class="+"coluna"+">"+contadorGrupo+" Acuerdos en el grupo</td>"; //adicionar valor contado por grupos
      
          html +="</tr>";//FIM NOME GRUPOS

        //IMPRIMIR EMAILS
        controlImp=0;//zerar o controlImp para contagem de outro email de usuário na lista de acordos (segundo o grupo que pertence)
        for(var y=0;y<emailUsuario.length;y++){
          
          var auxConteudo="";//Utilizado para não imprimir filas vazias 
          html +="</tr>";
          for(var x=0;x< response.userAgreementList.length; x++){

            var emailAgr=response.userAgreementList[x].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].email;
              
            if(emailAgr==emailUsuario[y]){//contar emails por grupo
           
                if(response.userAgreementList[x].groupId==idGrupo[j]){
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
        
        } // FIM IMPRIMIR EMAILS

        $('table tbody').append(html);
      }
        // IMPRIMIR TOTAL DE ACORDOS POR GRUPO
        html ="<tr>";
        html +="<td>TOTAL</td>";
        html +="<td>"+somaTotal+"</td>";
        html +="</tr>";
        $('table tbody').append(html);
  })
  .catch(error => {
    console.error(error);
  });
}

getAgreements();

