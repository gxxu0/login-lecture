"use strict"

const { use } = require(".");


const output = {
    home: (req, res) => {
        res.render("home/index");
    },
        
    login: (req, res) => {
        res.render("home/login");
    },
};


const users = {
    id: ["jinny", "지니", "염진희"],
    psword: ["1234", "12345", "123456"]
};

// const home = (req, res) => {
//     res.render("home/index");
// };

// const login = (req, res) => {
//     res.render("home/login");
// };


const process = {
    login: (req, res) => {
        //console.log(req.body);
        const id = req.body.id,
            psword = req.body.psword
        
        //console.log(id, psword);
        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if (users.psword[idx] === psword){
                return res.json({
                    success: true,
                });
            }
        }
        return res.json({
            success: false,
            msg: "로그인에 실패하셨습니다."
        })
    },
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



