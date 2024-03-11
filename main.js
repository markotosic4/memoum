import { Player } from "./player.js";
import { Table } from "./table.js";
import { usersResults, sorting } from "./userResultes.js";
import { data } from "./data.js";
import { permutation } from "./permutation.js";


let heroBtn = document.querySelector("#hero__btn");
let heroDisplay = document.querySelector("#hero");
let selectLevel = document.querySelector("#selectLevel");
let form = document.querySelector("#form");
let levelSubmitBtn = document.querySelector("#level__submit");
let userName = document.querySelector("#userName");
let levels = document.getElementsByName("level");
let levelTitle = document.querySelector("#level__title");
let mainDisplay = document.querySelector("#main")
let mainTable= document.querySelector("#mainTable");
let user = document.querySelector("#nav__user");
let moves = document.querySelector("#nav__moves span")
let timer  = document.querySelector("#nav__timer");
let backBtn = document.querySelector("#back");
let closeSelectSection = document.querySelector(".closeSelectSection");
let rankTable = document.querySelector(".rank__article__table");
let ranklevels = document.querySelector(".rank__article__levels");
let rank = document.querySelector("#rank")
let restart = document.querySelector("#restart");
let closeRank = document.querySelector("#closeRank");
let playAgain = document.querySelector("#play-again__btn")
let table = document.querySelector("#mainTable");

let m = 0;
let s = 0;
let clock;


let userLevel;

let niz = [];
let pogodak = 0;

function prikaziSat(){
    s++;
    if(s == 60){
        m++;
        s=0;
    }
    s =(s<10) ? "0" + s : "" + s;
    timer.innerHTML = (m<10) ? `0${m}:${s}` : `${m}:${s}`;
    
}

let pomocniNiz= [];

heroBtn.addEventListener("click", ()=>{
    heroDisplay.style.display = "none";
    selectLevel.style.display = "grid";
    document.body.style.backgroundImage = "none";
    userName.focus();
    levels.forEach(level=>{
        if(level.checked){
            form.reset();
        }
    });
    if(localStorage.getItem("easy") == null){
        localStorage.setItem("easy",JSON.stringify(pomocniNiz));
    }
     if(localStorage.getItem("medium") == null){
        localStorage.setItem("medium",JSON.stringify(pomocniNiz));
    }
    if(localStorage.getItem("hard") == null){
        localStorage.setItem("hard",JSON.stringify(pomocniNiz));
    }
     if(localStorage.getItem("expert") == null){
        localStorage.setItem("expert",JSON.stringify(pomocniNiz));
    }
    
    
});


levelSubmitBtn.addEventListener("click", (e)=>{
   e.preventDefault();
   validation();
   if(validation()){
    let player = new Player(userName.value, 0, selectedLevel);
    let table = new Table(player.level);
    table.createTable();
    table.displayImages();
    mainTable.addEventListener("click", changeBackToFront);
    user.innerHTML = userName.value;
    mainDisplay.style.display = "grid";
    selectLevel.style.display = "none";
    clearInterval(clock);
    clock = undefined;
    if(clock === undefined){
        clock = setInterval(prikaziSat, 1000);
    }
   }
})

selectLevel.addEventListener("mouseover", ()=>{
    if(userName.value.split(" ").join('') == ""){
        userName.style.border = "3px solid #FF3838";
    }else{
        userName.style.border = "none";
        userName.style.backgroundColor = "#B5FFEF"
    }

})

selectLevel.addEventListener("touchmove", ()=>{
    if(userName.value.split(" ").join('') == ""){
        userName.style.border = "3px solid #FF3838";
    }else{
        userName.style.border = "none";
        userName.style.backgroundColor = "#B5FFEF"
    }
   
   
})

selectLevel.addEventListener('click', ()=>{
    
    levels.forEach(level =>{
        if(level.checked){
            level.parentNode.style.backgroundColor = "#A0FFF9"
            level.parentNode.style.border = "1px solid black"
        } else{
            level.parentNode.style.backgroundColor = "#2FD7CF"
            level.parentNode.style.border = "none"
        }
    })
   
})


let selectedLevel;
function validation (){
    levels.forEach(level=>{
     if(level.checked){
         selectedLevel = level.value;
         userLevel = level.id;
     }
    });

    if(userName.value.split(" ").join('') == ""){
        userName.style.border = "3px solid #FF3838";
        userName.placeholder = "PLEASE ENTER A VALID NAME";
        userName.style.backgroundColor = "#FF6462";
        return false;
      }else if(!selectedLevel){
          levelTitle.innerHTML = "PLEASE SELECT LEVEL";
          levelTitle.style.color = "#D34B4B";
          levelTitle.style.fontSize = "28px";
          levelTitle.style.opacity = "1";
          return false;
      } else{
        userName.style.backgroundColor = "#B5FFEF";
        levelTitle.innerHTML = "SELECT LEVEL";
        levelTitle.style.color = "black";
        levelTitle.style.opacity = "0.5";
        return selectedLevel;
      }
}

function saveCurentUserData(){
    let data = {user:userName.value,time: timer.innerHTML}
     localStorage.setItem("curentUser", JSON.stringify(data));
}

function saveUserResults(){
    let curentUser = JSON.parse(localStorage.getItem("curentUser"));
    let data = JSON.parse(localStorage.getItem(userLevel));
    data.push(curentUser);
    localStorage.setItem(userLevel, JSON.stringify(data)); 
}




function changeBackToFront(e){
    if(e.target.tagName == "IMG" && e.target.getAttribute("src") == "assets/back.png"){
        if(niz.length == 0  ){
            niz.push(e.target); 
        } else{
            if(niz[0].id != e.target.id){
                niz.push(e.target); 
            }
        }

        if(niz.length < 3){
            e.target.src = e.target.getAttribute("front_src");
            
    } 
    if(niz.length == 2){
        let imgs = mainTable.querySelectorAll('img');
        if(niz[0].getAttribute("src") == niz[1].getAttribute("src") && niz[0].id != niz[1].id){
            let move = Number(moves.innerHTML);
            moves.innerHTML = `${move + 1}`;
            niz= [];
            pogodak++;
            endGame(pogodak);
            
        }else{
            imgs.forEach(img=>{
                if(img.src == niz[0].src || img.src == niz[1].src)
                    setTimeout(()=>{
                        img.src = "assets/back.png";
                        niz= [];
                        
                    },1000)
            });
            let move = Number(moves.innerHTML);
             moves.innerHTML = `${move + 1}`;
        }
    }
    }
    
   
}

function endGame(p){
    let level = selectedLevel;
    
    if(p == level * level / 2){
        clearInterval(clock);
        clock = undefined;
        mainTable.removeEventListener("click",changeBackToFront)
        mainDisplay.style.display = "none";
        rank.style.display = "flex";
        saveCurentUserData();
        saveUserResults();
        userResultes()
       
        
    }
}

backBtn.addEventListener("click", goBack);

function goBack(){
        clearInterval(clock);
        clock = undefined;
        m = 0;
        s = 0;
        timer.innerHTML = "00:00"
        moves.innerHTML = 0;
        mainTable.innerHTML = "";
        mainDisplay.style.display = "none";
        selectLevel.style.display = "block";
        pogodak = 0;
}

closeSelectSection.addEventListener("click", closeSection);

function closeSection(){
    selectLevel.style.display = "none";
    heroDisplay.style.display = "flex";
    userName.value = "";
    document.body.style.backgroundImage = `url("../assets/hero-bg_mob.png")`;
    userName.style.backgroundColor = "#B5FFEF";
    levelTitle.innerHTML = "SELECT LEVEL";
    levelTitle.style.color = "black";
    levelTitle.style.opacity = "0.5";
    userName.style.border = "none";
    userName.placeholder ="ENTER YOUR NAME:";
    userName.style.backgroundColor = "#B5FFEF";
    levels.forEach(level=>{
        if(level.checked){
            form.reset();
            level.checked = false;
        }
    });
    selectedLevel = undefined;
    clearInterval(clock);
    
    clock = undefined;
}

restart.addEventListener("click", reset);

function reset () {
    table.innerHTML = '';
    let tableNew = new Table(selectedLevel);
    tableNew.createTable();
    tableNew.displayImages();
   
    console.log(userLevel);
    permutation(data);
    clearInterval(clock);
        clock = undefined;
        m = 0;
        s = 0;
        timer.innerHTML = "00:00"
        moves.innerHTML = 0;
        pogodak = 0;
        let imgs = mainTable.querySelectorAll('img');
        imgs.forEach(img =>{
            img.src = "assets/back.png";
        })
        if(clock === undefined){
            clock = setInterval(prikaziSat, 1000);
        }   
}


ranklevels.addEventListener("click", usersResults)

function userResultes(){
    let table = `
    <tr class="rank__article__table__title">
       <td>RANK</td>
       <td>PLAYER</td>
       <td>TIME</td>
    </tr>`;
  
    let usersResultsData = JSON.parse(localStorage.getItem(userLevel));
    if(usersResultsData.length>=5){
        for(let i=0; i<5; i++){
            
            sorting (usersResultsData)
             table += `<tr>
                        <td>${i+1}</td>
                        <td>${ usersResultsData[i].user}</td>
                        <td>${ usersResultsData[i].time}</td>
                      </tr>`
        }
        rankTable.innerHTML = table;
    }else{
  
        
         sorting (usersResultsData)
        let users = usersResultsData.length;
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

closeRank.addEventListener('click', closeTop5);
playAgain.addEventListener("click", playagain)

function closeTop5(){
    rank.style.display = "none";
    heroDisplay.style.display = "flex";
    userName.value = "";
    document.body.style.backgroundImage = `url("../assets/hero-bg_mob.png")`;
    userName.style.backgroundColor = "#B5FFEF";
    levelTitle.innerHTML = "SELECT LEVEL";
    levelTitle.style.color = "black";
    levelTitle.style.opacity = "0.5";
    userName.style.border = "none";
    userName.placeholder ="ENTER YOUR NAME:";
    userName.style.backgroundColor = "#B5FFEF";

    selectedLevel = undefined;
    levels.forEach(level=>{
        if(level.checked){
            form.reset();
        }
    });
    m = 0;
    s = 0;
    timer.innerHTML = "00:00"
    moves.innerHTML = 0;
    mainTable.innerHTML = "";
     let imgs = mainTable.querySelectorAll('img');
    imgs.forEach(img =>{
        img.src = "assets/back.png";
    })

   
    
    pogodak = 0;
}

function playagain(){
    rank.style.display = "none";
    selectLevel.style.display = "block";
    m = 0;
    s = 0;
    timer.innerHTML = "00:00"
    moves.innerHTML = 0;
    mainTable.innerHTML = "";
    pogodak = 0;
         
}


