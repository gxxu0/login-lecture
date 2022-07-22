"use strict";

const UserStorage = require("./UserStorage");
class User{
    constructor(body){ // body는 home.ctrl.js의 new User(req.body);의 body를 받음
        this.body = body; // body가 User라는 변수의 body라는 변수 안으로 들어감
        
    }

    async login(){
        //const { id, psword } = UserStorage.getUsers("id", "psword");
        //console.log(id, psword);
        const client = this.body;
        //const { id, psword } = UserStorage.getUserInfo(client.id);
        UserStorage.getUserInfo(client.id);

        //await을 사용하여 데이터를 모두 읽어올 때 까지 기다리게함.
        //await은 항상 promise를 반환하는 애한테만 부여할 수 있음!!!
        //promise를 반환하기 때문에 .then()으로도 접근하여 데이터를 가져올 수 없음. 
        //await을 사용해준 이유는 "가독성". fs(file system)에서도 await을 가져올 수 없음. 
        const { id, psword } = await UserStorage.getUserInfo(client.id); //undefined
        //console.log(a);
        if( id ){
            if (id === client.id && psword === client.psword){
                return { success : true};
            }
            return { success : false, msg: "비밀번호가 틀렸습니다."};
        }
        return { success : false, msg: "존재하지 않는 아이디입니다."};
        

    }
    async register(){
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            UserStorage.save(client);
            //console.log(response)
            return response;
        }catch(err){
            //console.log(err);
            return {success: false, msg : err};
        }

    }
}
module.exports = User; //외부에서 사용할 수 있도록 작성

///////////////////////////////////////////////////////
/*
const process = {
    login: (req, res) => {
        users.login()
    },
};
와 같은 형태로 만들기 위해 User라는 class를 '인스턴스' 형태로 제작 
--> const user = new User();
===> const user = new User(req.body); // user가 클라이언트의 특성을 갖도록 만들 것
     const response = user.login();
     return res.json(response);

*/