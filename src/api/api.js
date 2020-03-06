import * as axios from "axios";


const baseURL = "https://social-network.samuraijs.com/api/1.0/";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "9b1ed003-d374-49c4-a5a6-e095c440ccd1"
    }
})


export let AuthAPI = {
    getLogin () {
        return instance.get(baseURL + "auth/me").then(response => response.data);
    }
};


export let UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(baseURL + `users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data);
    }
};


export let ProfileAPI = {
    getProfile(id) {
        return instance.get(baseURL + `profile/` + id);
    },

    getStatus(id){
        
        return instance.get(baseURL + `profile/status/` + id);
    },

    updateStatus(status){
       
        return instance.put(baseURL + `profile/status`, {status: status});
    }
};


export let followAPI = (id) => {
    return instance.post(baseURL + "follow/" + id, {}).then(response => response.data);
}

export let unfollowAPI = (id) => {
    return instance.delete((baseURL + "follow/" + id)).then(response => response.data)
}