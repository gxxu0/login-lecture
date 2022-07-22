"use strict";

const fs = require("fs").promises; //파일시스템 불러오기. fs를 이용하여 users.json에 접근
//promises -> fs가 promise반환
//promise : 약속. promise가 수행하는 동작이 끝남과 동시에 상태를 알려주기 때문에 비동기 처리에 아주 효과적. 


class UserStorage { //파일명과 동일하게 하는게 좋음
    // static #users = { //UserStorage 자체에서 users변수에 접근 가능
    //     //#users ==> public -> private(외부에서 부를 수 x) 
        
    //     id: ["jinny", "지니", "염진희"],
    //     psword: ["1234", "12345", "123456"],
    //     name: ["지니", "지니지니", "지니지니지니"]
    // }; => users.json

    //가독성 좋도록 getUserInfo 정리
    
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, psword, name]
        const userInfo = usersKeys.reduce( (newUsers, info) => {
            newUsers[info] = users[info][idx];
            return newUsers;
        }, {});
        //console.log(userInfo);

        return userInfo;
    }
    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce( (newUsers, field) => {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
    //데이터를 받아올 수 있도록 메서드 생성
    static getUsers(isAll, ...fields){ // class자체에서 메서드에 접근하도록 static붙이기
        return fs.readFile("./src/databases/users.json") //Promise { <pending> }
        .then( (data) => { 
            return this.#getUsers(data, isAll, fields); //위(주석) 코드들 가독성 좋게 !!
        })
        .catch( (err) => console.log(err) );
        //const users = this.#users;
        // const newUsers = fields.reduce( (newUsers, field) => {
        //     //console.log(newUsers, field);
        //     if(users.hasOwnProperty(field)){
        //         newUsers[field] = users[field];
        //     }
        //     return newUsers;
        // }, {});
        // //console.log(newUsers);
        // //return this.#users;
        // return newUsers;
    }
    static getUserInfo(id){
        //const users = this.#users;

        //promise반환함. Promise { <pending> } ) promise를 반환하면 .then에 접근할 수 있음.
        //<pending> -> data를 전부 읽어오질 못했다는 뜻.
        return fs.readFile("./src/databases/users.json") //Promise { <pending> }
        .then( (data) => { 
            // const users = JSON.parse(data);
            // const idx = users.id.indexOf(id);
            // const usersKeys = Object.keys(users); // => [id, psword, name]
            // const userInfo = usersKeys.reduce( (newUsers, info) => {
            //     newUsers[info] = users[info][idx];
            //     return newUsers;
            // }, {});
            // //console.log(userInfo);

            // return userInfo;

            
            return this.#getUserInfo(data, id); //위(주석) 코드들 가독성 좋게 !!
        })
        .catch( (err) => console.log(err) );
        // , (err, data) => {
        //     if(err) throw err;
        //     //console.log(JSON.parse(data)); //data를 볼 수 있는 데이터로 불러오기
        //     const users = JSON.parse(data);

        //     const idx = users.id.indexOf(id);
        //     const usersKeys = Object.keys(users); // => [id, psword, name]
        //     const userInfo = usersKeys.reduce( (newUsers, info) => {
        //         newUsers[info] = users[info][idx];
        //         return newUsers;
        //     }, {});
    
        //     return userInfo;
        // });

    }

    static async save(userInfo){  //서버가 껐다 켜졌을 때 초기화 됨. 따라서 데이터를 파일에 저장해야함. 
        //const users = this.#users;
        // users.id.push(userInfo.id);
        // users.name.push(userInfo.name);
        // users.psword.push(userInfo.psword);
        // //console.log(users); //{id: [ 'jinny', '지니', '염진희', 'jinny' ],psword: [ '1234', '12345', '123456', '123' ],name: [ '지니', '지니지니', '지니지니지니', '염진희' ]}
        // return { success: true };

        //users.json 파일의 데이터를 읽어온 다음에 data에 추가하고 싶은 데이터를 넣은 후 fs.writeFile하기.
        const users = await this.getUsers(true);
        //console.log(users);
        if(users.id.includes(userInfo.id)) { 
            throw "이미 존재하는 아이디입니다.";

        }
        //client가 입력한 user정보의 아이디가 database의 id에 포함되어있지 않으면
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        //데이터 추가저장
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return { success : true };
    }
}
module.exports = UserStorage;