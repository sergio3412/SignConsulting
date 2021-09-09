
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
      
      var html = "<tr>";
      html +="<td>"+response.userInfoList[i].firstName+"</td>";
      html +="<td>"+response.userInfoList[i].lastName+"</td>";
      html +="<td>"+response.userInfoList[i].email+"</td>";
      html +="<td>"+response.userInfoList[i].company+"</td>";  
     // html +="<td>"+response.userInfoList[i].id+"</td>";   
      html +="<td>"+response.userInfoList[i].isAccountAdmin+"</td>";
      //html +="<td>"+response.userInfoList[i].accountId+"</td>";  
      html +="</tr>";
      $('table tbody').append(html);
       /*código comentado devido a mostrar os valores encriptados*/
     
}
 
  })
  .catch(error => {
    console.error(error);
  });
}

getUsers();

