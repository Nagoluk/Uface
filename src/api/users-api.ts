
import {instance} from './api';
import {IBaseResponse, IGetItems} from '../interfaces/common-interfaces';
import {UserT} from '../interfaces/users-interfaces';


export let UsersAPI = {
    //todo: &friend=true
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<IGetItems<UserT>>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    Search(text: string) {
        return instance.get<IGetItems<UserT>>(`users?term=${text}&count=${5}`)
    },


    followAPI: (id: number) => {
        return instance.post<IBaseResponse>('follow/' + id, {}).then(response => response.data);
    },

    unfollowAPI: (id: number) => {
        return instance.delete<IBaseResponse>('follow/' + id).then(response => response.data)
    }
};