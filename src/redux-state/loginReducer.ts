import {AuthAPI, getSecureCaptcha, ProfileAPI} from "../api/api";
import { stopSubmit } from "redux-form";
import { ResultsCodes, ResultCodeForCaptcha } from "../api/api-types";
import {nullable} from "../interfaces/common-interfaces";
import {InferActionsTypes} from "./stateRedux";
import {ProfileType} from "../interfaces/profile-interfaces";


let initState = {
    id: null as nullable<number>,
    email: null as nullable<string>,
    login: null as nullable<string>,
    isLogined: false,
    captchaURL: "",
    profile: null as nullable<ProfileType>
}

const loginReducer = (state = initState, action: ActionsType):InitLoginStateType => {

    switch(action.type){
        case 'SET_USER_LOGIN':
            return {
                ...state, 
                ...action.data,
                id: action.data.id,
            }

        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                captchaURL: action.URL
            }

        case 'SET_OWN_PROFILE':
            return {
                ...state,
                profile: action.profile
            }


        default: return state
        
    }
}

const actionsLogin = {
    setUserLoginAC : (id: nullable<number>, login:nullable<string>, email: nullable<string>, isLogined: boolean) => {
        return ({type: 'SET_USER_LOGIN', data:{id, login, email, isLogined}} as const)
    },

    setCaptchaUrlAC: (URL: string) => ({type: 'SET_CAPTCHA_URL', URL} as const),

    setProfileAC: (profile: nullable<ProfileType>) => ({type: 'SET_OWN_PROFILE', profile} as const)
}


export let loginThunkCreator = () => {
    return (dispatch: any) => {
        return AuthAPI.getLogin().then((response: any) => {
            if(response.resultCode === ResultsCodes.Success){
                let {id, login, email} = response.data;
                dispatch(actionsLogin.setUserLoginAC(id, login, email, true));

                ProfileAPI.getProfile(id).then((response: any) => {
                    dispatch(actionsLogin.setProfileAC(response.data));
                })
            }   
        });

    }
}

export let getCaptchaThunkCreator = () => {
    return (dispatch: any) => {
        getSecureCaptcha().then((url: string) => {
            dispatch(actionsLogin.setCaptchaUrlAC(url))
        })
    }
}

export let login = (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null ) => {
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
                dispatch(actionsLogin.setUserLoginAC(null, null, null, false))
            }
        })
    }
}


export default loginReducer;

type ActionsType = InferActionsTypes<typeof actionsLogin>
export type InitLoginStateType = typeof initState;
