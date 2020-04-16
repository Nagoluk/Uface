import {AuthAPI, getSecureCaptcha} from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_LOGIN = "SET_USER_LOGIN";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";


let initState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogined: false as boolean,
    captchaURL: "",
}

export type InitStateType = typeof initState;


const loginReducer = (state = initState, action: any):InitStateType => {

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

type dataType = {
    id: number | null
    login: string | null
    email: string | null
    isLogined: boolean
}

type setUserLoginType = {
    type: typeof SET_USER_LOGIN,
    data: dataType
}

export let setUserLoginAC = (id: number | null, login: string | null, email: string | null, isLogined: boolean):setUserLoginType => {
    return {type: SET_USER_LOGIN, data:{id, login, email, isLogined}}
}

type setCaptchaUrlACType = {
    type: typeof SET_CAPTCHA_URL,
    URL: string
}

export let setCaptchaUrlAC = (URL: string):setCaptchaUrlACType => ({type: SET_CAPTCHA_URL, URL})


export let loginThunkCreator = () => {
    return (dispatch: any) => {
        return AuthAPI.getLogin().then((response: any) => {

            if(response.resultCode === 0){
                let {id, login, email} = response.data;

                dispatch(setUserLoginAC(id, login, email, true));
            }   
        });

    }
}

export let getCaptchaThunkCreator = () => {
    return (dispatch: any) => {
        getSecureCaptcha().then((url: string) => {
            dispatch(setCaptchaUrlAC(url))
        })
    }
}


export let login = (email: string, password: string, rememberMe: boolean = false, captcha = null) => {
   

    return (dispatch: any) => {

        AuthAPI.login(email, password, rememberMe, captcha).then((response: any) => {
            if(response.data.resultCode === 0){
              dispatch(loginThunkCreator())
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
    return (dispatch: any) => {
        AuthAPI.logout().then((response:any)  => {
            if(response.data.resultCode === 0){
                window.location.reload();
                dispatch(setUserLoginAC(null, null, null, false))
            }
           
        })
    }
}


export default loginReducer;
