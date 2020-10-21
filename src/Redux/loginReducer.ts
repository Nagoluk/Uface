import {AuthAPI, getSecureCaptcha, ProfileAPI} from "../api/api";
import { stopSubmit } from "redux-form";
import { ResultsCodes, ResultCodeForCaptcha } from "../api/api-types";
import {ProfileType} from "./profileReducer";

const SET_USER_LOGIN = "SET_USER_LOGIN";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";
const SET_OWN_PROFILE = "SET_OWN_PROFILE";



let initState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogined: false as boolean,
    captchaURL: "",
    profile: null as null | ProfileType
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

        case SET_OWN_PROFILE:
            return {
                ...state,
                profile: action.profile
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

type setProfileACType = {
    type: typeof SET_OWN_PROFILE,
    profile: null | ProfileType
}

export let setProfileAC = (profile: null | ProfileType):setProfileACType => ({type: SET_OWN_PROFILE, profile})


export let loginThunkCreator = () => {
    return (dispatch: any) => {
        return AuthAPI.getLogin().then((response: any) => {

            if(response.resultCode === 0){

                let {id, login, email} = response.data;
                dispatch(setUserLoginAC(id, login, email, true));

                ProfileAPI.getProfile(id).then((response: any) => {
                    dispatch(setProfileAC(response.data));
                })
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
            if(response.data.resultCode === ResultsCodes.Success){
              dispatch(loginThunkCreator())

            }else if(response.data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired){
            
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
            if(response.data.resultCode === ResultsCodes.Success){
                window.location.reload();
                dispatch(setUserLoginAC(null, null, null, false))
            }
           
        })
    }
}


export default loginReducer;
