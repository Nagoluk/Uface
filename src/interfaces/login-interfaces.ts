import {nullable} from "./common-interfaces";

export interface ILogin {
    id: nullable<number>,
    login:nullable<string>,
    email: nullable<string>,
}

