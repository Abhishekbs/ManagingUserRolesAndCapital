class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(data,cb){
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("token",data.token);
        localStorage.setItem("permission",data.permission);
        // this.authenticated = true;
        cb();
    }


    logout(cb){
        localStorage.clear();
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }


}

export default new Auth();