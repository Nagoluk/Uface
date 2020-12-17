import axios from "axios";
import {ProfileType} from "../Redux/profileReducer";
import {
    GetLoginResponseType,
    LoginResponseType,
    LogoutResponseType,
    GetUsersType,
    DialogsType,
    BasisType, messageType, MessagesType, StatusType
} from "./api-types";

const DEBUG = process.env.NODE_ENV === "development";



const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9b1ed003-d374-49c4-a5a6-e095c440ccd1",  
    }
})

instance.interceptors.request.use((config) => {
    console.log('Works!')
    /** In dev, intercepts request and logs it into console for dev */
    if (DEBUG) { console.info("✉️ ", config); }
    return config;
}, (error) => {
    if (DEBUG) { console.error("✉️ ", error); }
    return Promise.reject(error);
});

//const socket = io.connect("https://social-network.samuraijs.com/api/1.0/dialogs")


export let AuthAPI = {
    getLogin () {
        return instance.get<GetLoginResponseType>("auth/me").then(response => response.data);
    },

    login (email: string, password: string, rememberMe = false, captcha: null | string = null){

        if(captcha) return instance.post<LoginResponseType>("auth/login", {email, password, rememberMe, captcha});

        return instance.post<LoginResponseType>("auth/login", {email, password, rememberMe});
    },

    logout () {
        return instance.delete<LogoutResponseType>("auth/login");
    }
};


export let UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data);
    },

    Search(text: string) {
        return instance.get<GetUsersType>(`users?term=${text}&count=${5}`)
    }
};

export let DialogsAPI = {
    getDialogs(){
        return instance.get<DialogsType>("dialogs")
    },

    startChating(id: number) {
        return instance.put<BasisType>(`dialogs/${id}`)
    },

   sendMessage(id: number, body: string){
        return instance.post<messageType>(`dialogs/${id}/messages`, {body: body}).then(response => response.data)
    },

    getMessages(UserId: number){
        return instance.get<MessagesType>(`dialogs/${UserId}/messages/new?newerThen=2019-4-19`)
    },

    getMessageCount (){
        return instance.get<number>("dialogs/messages/new/count");
    },

    deleteMessage(messageId: string){
        return instance.delete<BasisType>(`dialogs/messages/${messageId}`)
    }
}



export let ProfileAPI = {
    getProfile(id: number) {
        return instance.get<ProfileType>("profile/" + id)
    },

    getStatus(id: number){
        return instance.get<string>("profile/status/" + id);
    },

    putProfileData(data: ProfileType){
        return instance.put<BasisType>("profile", data)
    },

    updateStatus(status: string){
        return instance.put<BasisType>("profile/status", {status: status});
    },

    uploadAvatar(avatar: any) {
        let formData = new FormData();
        formData.append("image", avatar)


        return instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    }
};

export let getSecureCaptcha = () => {
    return instance.get("security/get-captcha-url").then(response => response.data.url);
}


export let followAPI = (id: number) => {
    return instance.post<BasisType>("follow/" + id, {}).then(response => response.data);
}

export let unfollowAPI = (id: number) => {
    return instance.delete<BasisType>("follow/" + id).then(response => response.data)
}