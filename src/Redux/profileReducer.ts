import {ProfileAPI, UsersAPI} from "../api/api";
import { stopSubmit } from "redux-form";
import {photosT} from "./messageReducer";

const ADD_NEW_POST = "ADD_NEW_POST";
const SET_PROFILE = "SET_PROFILE";
const SET_STATUS = "SET_STATUS";
const USERS_IS_FETCHING = "USERS_IS_FETCHING ";
const DELETE_POST = "DELETE_POST";
const SET_AVATAR_SUCCESS = "SET_AVATAR_SUCCESS";
const UPOAL_PROFILE_INFO_PROCCESS = "UPOAL_PROFILE_INFO_PROCCESS";
const SET_FOLLOW = "SET_FOLLOW";

type PostDataType = {
    id: number,
    content: string,
    likes: number,
    rep: number,
    comm: number,
    dataSend: string
}
type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
}

export type ProfileType = {
    aboutMe: string | null,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription?: string | null,
    fullName: string,
    userId: number,
    photos: photosT
}

let initialProfilePage = {
    PostsData: [
        {id: 1, content: "Hello Uface!", likes: 0, rep: 0, comm: 0, dataSend: "Sun Mar 15 2020 18:44:42"},
    ] as Array<PostDataType>,

    profile: null as null | ProfileType,
    status: "" as string,
    isFetching: true as boolean,
    isUploadProfile: false as boolean,
    isFollowed: false as boolean,
};

type initialProfilePageType = typeof initialProfilePage;

const profileReducer = (state = initialProfilePage, action: any): initialProfilePageType =>{
    switch(action.type) {
        case ADD_NEW_POST:
            let currentData = new Date().toString().slice(0, 24);

            let stateCopy = {
                ...state,
                PostsData: [...state.PostsData, {id: 1, content: action.text, likes: 0, rep: 0, comm: 0, dataSend: currentData}],
            };

            return stateCopy;


        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        
        case SET_STATUS: 
            return {
                ...state,
                status: action.status
            };

        case USERS_IS_FETCHING : {
           
            return {
                ...state,
                isFetching: action.payload
            }
        }

        case DELETE_POST: {

            return {
                ...state,
                PostsData: state.PostsData.filter(item => item.id !== action.id)
            }
        }

        case SET_AVATAR_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                } as ProfileType
            }
        }

        case SET_FOLLOW: {
            return {
                ...state,
                isFollowed: action.payload
            }
        }

        case UPOAL_PROFILE_INFO_PROCCESS: {
            return {
                ...state,
                isUploadProfile: action.payload
            }
        }


        default:
            return state;

    }
}

type addNewPostACT = {type: typeof ADD_NEW_POST, text: string}
export const addNewPostAC = (text: string): addNewPostACT => ({type: ADD_NEW_POST, text})

type deletePostACT = {type: typeof DELETE_POST, id: number}
export const deletePostAC = (id:number): deletePostACT => ({type: DELETE_POST, id})

type savePhotoSuccessACT = {type: typeof SET_AVATAR_SUCCESS, photos: photosT}
export const savePhotoSuccess = (photos: photosT): savePhotoSuccessACT => ({type: SET_AVATAR_SUCCESS, photos})

type isUploadProfileACT = {type: typeof UPOAL_PROFILE_INFO_PROCCESS, payload: boolean}
export const isUploadProfileAC = (payload: boolean): isUploadProfileACT => ({type: UPOAL_PROFILE_INFO_PROCCESS, payload})

type setFollowACT = {type: typeof SET_FOLLOW, payload: boolean}
export const setFollowAC = (payload: boolean): setFollowACT => ({type: SET_FOLLOW, payload})

type isFetchingACT = {type: typeof USERS_IS_FETCHING, payload: boolean}
export const isFetchingAC = (condition: boolean): isFetchingACT => {
    return {
        type: USERS_IS_FETCHING ,
        payload: condition
    }
}

type setProfileACT = {type: typeof SET_PROFILE, profile: ProfileType}
export const setProfile = (profile: ProfileType): setProfileACT =>{
    return {
        type: SET_PROFILE,
        profile: profile
    }
}

type setStatusACT = {type: typeof SET_STATUS, status: string | null}
export const setStatus = (status: string | null): setStatusACT => {
    return {
        type: SET_STATUS,
        status
    }
}


export const getProfileThunkCreator = (id: number) => {

    return (dispatch: any) =>{
        dispatch(isFetchingAC(true))

        ProfileAPI.getProfile(id).then((response: any) => {
            UsersAPI.Search(response.data.fullName).then((i: any) =>{
                dispatch(setFollowAC(i.data.items[0].followed))
                dispatch(setProfile(response.data))
                dispatch(isFetchingAC(false))
            })

        });
    }
}

export const getStatusThunkCreator = (id: number) => {
    return (dispatch: any)=>{
        ProfileAPI.getStatus(id).then((response: any) => {
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatusThunkCreator = (status: string ) => {
    return (dispatch: any)=>{
        ProfileAPI.updateStatus(status).then((response: any) => {
            if(response.data.resultCode === 0)
                dispatch(setStatus(status))
        })
    }
}

export const uploadAvatarThunkCreator = (avatar: any) => {
    return (dispatch: any)=>{
        ProfileAPI.uploadAvatar(avatar).then((response: any) => {

            if(response.resultCode === 0){
                dispatch(savePhotoSuccess(response.data.photos))
            }

        })
    }
}

export const putUserDataThunkCreator = (data: any) => {
    return (dispatch: any)=>{
        dispatch(isUploadProfileAC(true));
        ProfileAPI.putProfileData(data).then((response: any) => {
            if(response.data.resultCode === 0){
                dispatch(isUploadProfileAC(false));

            }else {
                dispatch(isUploadProfileAC(false));
                let action = stopSubmit("updateProfile", {_error: response.data.messages.join(" ")})
                dispatch(action)
            }

        })
    }
}




export default profileReducer;