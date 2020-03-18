import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9b1ed003-d374-49c4-a5a6-e095c440ccd1",  
    }
})


export let AuthAPI = {
    getLogin () {
        return instance.get("auth/me").then(response => {
          return  response.data;
        });
    },

    login (email, password, rememberMe, captcha = null){

        debugger;
        if(captcha) return instance.post("auth/login", {email, password, rememberMe, captcha});

        return instance.post("auth/login", {email, password, rememberMe});
    },

    logout () {
        return instance.delete("auth/login");
    }
};


export let UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data);
    }
};


export let ProfileAPI = {
    getProfile(id) {
        return instance.get("profile/" + id);
    },

    getStatus(id){
        return instance.get("profile/status/" + id);
    },

    updateStatus(status){
        return instance.put("profile/status", {status: status});
    },

    uploadAvatar(avatar) {
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


export let followAPI = (id) => {
    return instance.post("follow/" + id, {}).then(response => response.data);
}

export let unfollowAPI = (id) => {
    return instance.delete(("follow/" + id)).then(response => response.data)
}