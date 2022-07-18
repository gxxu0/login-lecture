"use strict";
// console.log('hello');
// console.log('bye');

//DOM // document object model(인터페이스) --> html에 데이터를 가져와서 제어
const id = document.querySelector("#id"), 
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"), 
    confirmPsword = document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#button"); //id --> register.ejs에 있는 태그들의 정보
//console.log(id);
registerBtn.addEventListener("click", register);

function register(){ //버튼 클릭 시 register 정보 가져오기 가능
    //console.log(id.value);
    if(!id.value){
        return alert("아이디를 입력해주세요.");
    }
    if(psword.value !== confirmPsword.value){
        return alert("비밀번호가 일치하지 않습니다.");
    }
    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
        //confirmPsword: confirmPsword.value,
    };
    
    //console.log(req);

    //console.log(req, JSON.stringify(req));
    //console.log();
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then( 
        (res) => {
            //console.log(res)
            if(res.success){
                location.href = "/login";
            }else{
                alert(res.msg); //로그인 실패 시, alert창 띄우기
            }
        }
    ).catch( 
        (err) => {
            //console.error(new Error("로그인 중 에러 발생")); //밑과 같음
            console.error("회원가입 중 에러 발생");
    }); 
    //서버와 데이터를 어떤 경로에서 주고받을 지 정해야함 //promise형태
}
