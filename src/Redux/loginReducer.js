import {AuthAPI, getSecureCaptcha} from "../api/api";
import { stopSubmit } from "redux-form";
const SET_USER_LOGIN = "SET_USER_LOGIN";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";


let initState = {
    id: null,
    email: null,
    login: null,
    isLogined: false,
    captchaURL: "",
}


const loginReducer = (state = initState, action) => {

    switch(action.type){
       
        case SET_USER_LOGIN:
            return {
                ...state, 
                ...action.data,
                id: action.data.id,
            }

        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.URL
            }


        default: return state
        
    }
}

export let setUserLoginAC = (id, login, email, isLogined) => {
    return {type: SET_USER_LOGIN, data:{id, login, email, isLogined}}
}

export let setCaptchaUrlAC = (URL) => ({type: SET_CAPTCHA_URL, URL}) 


export let loginThunkCreator = () => {
    return (dispatch) => {
        return AuthAPI.getLogin().then(response => {

            if(response.resultCode === 0){
                let {id, login, email} = response.data;

                dispatch(setUserLoginAC(id, login, email, true));
            }   
        });

    }
}

export let getCaptchaThunkCreator = () => {
    return (dispatch) => {
        getSecureCaptcha().then(url => {
            dispatch(setCaptchaUrlAC(url))
        })
    }
}


export let login = (email, password, rememberMe = false, captcha = null) => {
   

    return (dispatch) => {

        AuthAPI.login(email, password, rememberMe, captcha).then(response => {
            if(response.data.resultCode === 0){
              dispatch(loginThunkCreator(true))
            }else if(response.data.resultCode === 10){
            
                dispatch(getCaptchaThunkCreator());

                let action = stopSubmit("login", {_error: response.data.messages.join(" ")})
                dispatch(action)

            }else{
                let action = stopSubmit("login", {_error: response.data.messages.join(" ")})
                dispatch(action)
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


export default loginReducer;
