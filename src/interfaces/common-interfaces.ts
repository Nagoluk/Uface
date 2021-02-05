export type nullable<T> = T | null

export interface IKeys {
    [key: string]: any
}

export enum ResultsCodes {
    Success = 0,
    Error = 1,
}

export interface IFilters {
    friends: boolean,
    term: string
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export interface IBaseResponse<R = {}> {
    resultCode: ResultsCodes
    messages: Array<string>,
    fieldsErrors: Array<string>
    data: R
}

export interface IResponseWithCaptcha<R = {}>{
    resultCode: ResultsCodes | ResultCodeForCaptcha
    messages: Array<string>
    fieldsErrors: Array<string>
    data: R
}

export interface IGetItems<Items> {
    items: Array<Items>
    totalCount: number
    error: string | null
}

