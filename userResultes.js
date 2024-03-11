let rankTable = document.querySelector(".rank__article__table");


export function  usersResults(e){
    let table = `
    <tr class="rank__article__table__title">
       <td>RANK</td>
       <td>PLAYER</td>
       <td>TIME</td>
    </tr>`;
  
    let usersResultsData = JSON.parse(localStorage.getItem(e.target.getAttribute("class")));
    if(usersResultsData.length>=5){
       sorting(usersResultsData);

        for(let i=0; i<5; i++){
            sorting (usersResultsData)
            table += `<tr>
                        <td>${i+1}</td>
                        <td>${ usersResultsData[i].user}</td>
                        <td>${ usersResultsData[i].time}</td>
                      </tr>`
        }
        rankTable.innerHTML= table;
    }else if(usersResultsData.length==0){
        rankTable.innerHTML = ` <tr class="rank__article__table__title">
        <td>RANK</td>
        <td>PLAYER</td>
        <td>TIME</td>
    </tr>
    <tr>
        <td>1</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>2</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>3</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>4</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>5</td>
        <td></td>
        <td></td>
    </tr>`
    }
     else{
        sorting (usersResultsData)
        let users = usersResultsData.length;
        let table = `
    <tr class="rank__article__table__title">
       <td>RANK</td>
       <td>PLAYER</td>
       <td>TIME</td>
    </tr>`;
        for(let i =0; i<5; i++){
            if(i<users){
                table += `<tr>
                <td>${i+1}</td>
                <td>${ usersResultsData[i].user}</td>
                <td>${ usersResultsData[i].time}</td>
                 </tr>`
            } else{
                table += `<tr>
                <td>${i+1}</td>
                <td></td>
                <td></td>
                 </tr>`
            }
        }
        rankTable.innerHTML = table;
    }
    
   
}



export  function sorting (usersResultsData){
    for(let i=0; i<usersResultsData.length -1; i++){
        for(let j= i+1; j< usersResultsData.length; j++){
            if(usersResultsData[j].time.split(":")[0] < usersResultsData[i].time.split(":")[0]){
                let b = usersResultsData[i];
                usersResultsData[i] = usersResultsData[j];
                usersResultsData[j] = b;
            } else if(usersResultsData[j].time.split(":")[0] == usersResultsData[i].time.split(":")[0]){
                if(usersResultsData[j].time.split(":")[1] < usersResultsData[i].time.split(":")[1]){
                    let b = usersResultsData[i];
                    usersResultsData[i] = usersResultsData[j];
                    usersResultsData[j] = b;
                }
            }
        }
    }
}