"use strict";
// console.log('hello');
// console.log('bye');

//DOM // document object model(인터페이스) --> html에 데이터를 가져와서 제어
const id = document.querySelector("#id"), 
    psword = document.querySelector("#psword"), 
    loginBtn = document.querySelector("button"); //id --> login.ejs에 있는 태그들의 정보
//console.log(id);
loginBtn.addEventListener("click", login);

function login(){ //버튼 클릭 시 login 정보 가져오기 가능
    //console.log(id.value);
    const req = {
        id: id.value,
        psword: psword.value,
    };
    
    //console.log(req);

    //console.log(req, JSON.stringify(req));
    //console.log();
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
    .then( (res) => res.json())
    .then( (res) => console.log(res)); //서버와 데이터를 어떤 경로에서 주고받을 지 정해야함 //promise형태
}
