
import {instance} from './api';
import {IBaseResponse, IFilters, IGetItems} from '../interfaces/common-interfaces';
import {UserT} from '../interfaces/users-interfaces';
const qs = require('qs')


export let UsersAPI = {
    //todo: &friend=true
    getUsers(currentPage = 1, pageSize = 9, filters: IFilters) {
        let request = qs.stringify({page: currentPage, count: pageSize})

        return instance.get<IGetItems<UserT>>(`users?`+request)
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