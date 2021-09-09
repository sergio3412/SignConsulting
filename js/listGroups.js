
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
      /*Mostra na tabela campos mais relevantes*/
      var html = "<tr>";
      html +="<td>"+response.groupInfoList[i].groupId+"</td>";
      html +="<td>"+response.groupInfoList[i].createdDate+"</td>";  
      html +="<td>"+response.groupInfoList[i].groupName+"</td>";
      html +="<td>"+response.groupInfoList[i].isDefaultGroup+"</td>";  
      html +="</tr>";

      $('table tbody').append(html);   
}
  
  })
  .catch(error => {
    console.error(error);
  });
}

getGroups();

