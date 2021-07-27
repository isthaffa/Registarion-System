import store from "../redux/store"
class Auth{
    constructor(){
        this.authenticated=false

        store.subscribe(() => {
            // When state will be updated(in our case, when states will be fetched), 
           
            
                console.log(store.getState().userReducer.islogedin);
              this.authenticated= store.getState().userReducer.islogedin  
            
          });
    }
    login(cb){
        this.authenticated=true
        cb()
    }
    logout(cb){
        this.authenticated=false
        cb()

    }
    isAuthenticated(){
        return this.authenticated
    }

}

export default new Auth()