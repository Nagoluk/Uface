import {UserT} from "../Redux/usersReducer"
import {dialogT, messageT} from "../Redux/messageReducer";
 

export enum ResultsCodes{
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired= 10
}


export type GetLoginResponseType = {
    resultCode: ResultsCodes,
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}

export type LoginResponseType = {
    resultCode: ResultsCodes | ResultCodeForCaptcha
    messages: Array<string>,
    data: {
        userId: number
    }
}

export type BasisType = LoginResponseType;

export type LogoutResponseType = {
    resultCode: ResultsCodes
    messages: Array<string>,
    data: {}
}

export type GetUsersType = {
    totalCount: number,
    items: Array<UserT>,
    error: any,
}

export type DialogsType = Array<dialogT>
export type MessagesType = Array<messageT>


export type messageType = {
    resultCode: ResultsCodes
    messages: Array<string>
    data: {message: messageT}
}

export type StatusType = {
    resultCode: ResultsCodes
    messages: Array<string>,
    data: {status: string}
}




