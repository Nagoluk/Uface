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
            isLogined: true
        }

        default: return state
        
    }
}

export let setUserLoginAC = (id, login, email) => {
    return {type: SET_USER_LOGIN, data:{id, login, email}}
}


export let loginThunkCreator = () => {
    return (dispatch) => {
        AuthAPI.getLogin().then(response => {

            if(response.resultCode === 0){
                let {id, login, email} = response.data;

                dispatch(setUserLoginAC(id, login, email));
            }   
        });
    }
}


export default loginReducer
