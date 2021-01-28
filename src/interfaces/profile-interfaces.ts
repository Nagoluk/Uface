import {nullable} from "./common-interfaces";

export type photosT = {
    small: nullable<string>,
    large: nullable<string>
}

export type PostDataType = {
    id: nullable<number>,
    content: nullable<string>,
    likes: nullable<number>,
    rep: nullable<number>,
    comm: nullable<number>,
    dataSend: nullable<string>
}

export type ContactsType = {
    facebook: nullable<string>,
    website: nullable<string>,
    vk: nullable<string>,
    twitter: nullable<string>,
    instagram: nullable<string>,
    youtube: nullable<string>,
    github: nullable<string>,
    mainLink: nullable<string>
}

export type ProfileType = {
    aboutMe: nullable<string>,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription?: nullable<string>,
    fullName: string,
    userId: number,
    photos: photosT
}