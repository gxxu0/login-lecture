"use strict";

class UserStorage { //파일명과 동일하게 하는게 좋음
    static #users = { //UserStorage 자체에서 users변수에 접근 가능
        //#users ==> public -> private(외부에서 부를 수 x) 
        
        id: ["jinny", "지니", "염진희"],
        psword: ["1234", "12345", "123456"],
        name: ["지니", "지니지니", "지니지니지니"]
    };

    //데이터를 받아올 수 있도록 메서드 생성
    static getUsers(...fields){ // class자체에서 메서드에 접근하도록 static붙이기
        const users = this.#users;
        const newUsers = fields.reduce( (newUsers, field) => {
            //console.log(newUsers, field);
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        //console.log(newUsers);
        //return this.#users;
        return newUsers;
    }
    static getUserInfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, psword, name]
        const userInfo = usersKeys.reduce( (newUsers, info) => {
            newUsers[info] = users[info][idx];
            return newUsers;
        }, {});

        return userInfo;
    }
    static save(userInfo){  //서버가 껐다 켜졌을 때 초기화 됨. 따라서 데이터를 파일에 저장해야함. 
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        //console.log(users); //{id: [ 'jinny', '지니', '염진희', 'jinny' ],psword: [ '1234', '12345', '123456', '123' ],name: [ '지니', '지니지니', '지니지니지니', '염진희' ]}
        return { success: true };
    }
}
module.exports = UserStorage;