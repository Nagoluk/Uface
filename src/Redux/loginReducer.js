import {AuthAPI} from "../api/api";
const SET_USER_LOGIN = "SET_USER_LOGIN";


let initState = {
    id: null,
    email: null,
    login: null,
    isLogined: false
}


const loginReducer = (state = initState, action) => {

    switch(action.type){
       
        case SET_USER_LOGIN:
            return {
                ...state, 
                ...action.data,
                id: action.data.id,
            }
        

        default: return state
        
    }
}

export let setUserLoginAC = (id, login, email, isLogined) => {
    return {type: SET_USER_LOGIN, data:{id, login, email, isLogined}}
}


export let loginThunkCreator = (isLogined = false) => {
    return (dispatch) => {
        AuthAPI.getLogin().then(response => {

            if(response.resultCode === 0){
                let {id, login, email} = response.data;
        

                dispatch(setUserLoginAC(id, login, email, true));
            }   
        });
    }
}


export let login = (email, password, rememberMe = false) => {
    return (dispatch) => {
        AuthAPI.login(email, password, rememberMe).then(response => {
          
            if(response.data.resultCode === 0){
              dispatch(loginThunkCreator(true))
            }
        });
    }
}

export let logout = () =>{
    return (dispatch) => {
        AuthAPI.logout().then(response => {
            if(response.data.resultCode === 0){
                dispatch(setUserLoginAC(null, null, null, false))
            }
           
        })
    }
}


export default loginReducer
