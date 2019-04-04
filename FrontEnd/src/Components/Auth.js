class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(data,cb){
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("token",data.token);
        localStorage.setItem("permission",JSON.stringify(data.permission));
        localStorage.setItem("role",data.role);
        // this.authenticated = true;
        cb();
    }


    logout(cb){
        localStorage.clear();
    }

    isAuthenticated(){
        return this.authenticated;
    }


}

export default new Auth();