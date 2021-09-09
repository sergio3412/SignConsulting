
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
      /*Mostra na tabela campos mais relevantes*/
      var html = "<tr>";
      html +="<td>"+response.userAgreementList[i].id+"</td>";
      html +="<td>"+response.userAgreementList[i].type+"</td>";  
      html +="<td>"+response.userAgreementList[i].name+"</td>";
      html +="<td>"+''+response.userAgreementList[i].groupId+''+"</td>";
      //html +="<td>"+response.userAgreementList[i].displayDate+"</td>";  
      // html +="<td>"+response.userAgreementList[i].latestVersionId+"</td>";  
      html +="<td>"+response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].fullName+"</td>";
      html +="<td>"+response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].email+"</td>";
      html +="<td>"+response.userAgreementList[i].displayParticipantSetInfos[0].displayUserSetMemberInfos[0].company+"</td>";
      html +="<td>"+response.userAgreementList[i].status+"</td>";  
      //html +="<td>"+response.userAgreementList[i].displayDate+"</td>";  
      //html +="<td>"+response.userAgreementList[i].esign+"</td>"; 
      //html +="<td>"+response.userAgreementList[i].hidden+"</td>"; 
      html +="</tr>";

      $('table tbody').append(html);
    
}
  
  })
  .catch(error => {
    console.error(error);
  });
}

getAgreements();

