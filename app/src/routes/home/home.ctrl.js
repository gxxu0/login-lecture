"use strict"

//const UserStorage = require("../../models/UserStorage"); //UserStorage 모듈 불러오기

const { use } = require(".");
const User = require("../../models/User");


const output = {
    home: (req, res) => {
        res.render("home/index");
    },
        
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
};

//userstorage.js로 붙임
// const users = {
//     id: ["jinny", "지니", "염진희"],
//     psword: ["1234", "12345", "123456"]
// };

// const home = (req, res) => {
//     res.render("home/index");
// };

// const login = (req, res) => {
//     res.render("home/login");
// };


const process = {
    login: async (req, res) => {

        const user = new User(req.body);
        const response = await user.login(); //User에 await을 부여했으니 여기에도 부여!
        //console.log(response);
        return res.json(response);

        //console.log(req.body);
        // const id = req.body.id,
        //     psword = req.body.psword

        // // const userstorage = new UserStorage();
        // //console.log(UserStorage.users); //UserStorage에서 users로 접근하여 데이터 받아옴 => ({ id: [ 'jinny', '지니', '염진희' ], psword: [ '1234', '12345', '123456' ] })
        // //console.log(UserStorage.getUsers()); //getUsers를 static으로 불러왔으니 UserStorage클래스 자체에서 데이터 받아올 수 있음
        
        // //console.log(UserStorage.getUsers("id","psword", "name"));
        // //console.log(UserStorage.getUsers("psword")); //psword만 잘 출력됨
        // const users = UserStorage.getUsers("id","psword");
        // //UserStorage.getUsers("id","psword");
        // //console.log(id, psword);

        // const response = {}; //응답하는 객체(object)
        // if(users.id.includes(id)){
        //     const idx = users.id.indexOf(id);
        //     if (users.psword[idx] === psword){

        //         response.success = true;
        //         return res.json({
        //             //success: true,
        //             response
        //         });

        //     }
        // }
        // response.success = false;
        // response.msg = "로그인에 실패하셨습니다.";
        // return res.json(
        //     // success: false,
        //     // msg: "로그인에 실패하셨습니다."
        //     response
        // );
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.login(); 
        return res.json(response);
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.register();
        return res.json(response);
    }
};
// module.exports = {
//     home,
//     login,
// };
// == > home : home ,
//      login: login,

module.exports = {
    output,
    process,
};



