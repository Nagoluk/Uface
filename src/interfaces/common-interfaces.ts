export type nullable<T> = T | null

export enum ResultsCodes {
    Success = 0,
    Error = 1,
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

