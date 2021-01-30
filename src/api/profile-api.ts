import {ProfileType} from '../interfaces/profile-interfaces';
import {instance} from './api';
import {IBaseResponse} from '../interfaces/common-interfaces';

export let ProfileAPI = {
    getProfile(id: number) {
        return instance.get<ProfileType>('profile/' + id)
    },

    getStatus(id: number) {
        return instance.get<string>('profile/status/' + id);
    },

    putProfileData(data: ProfileType) {
        return instance.put<IBaseResponse>('profile', data)
    },

    updateStatus(status: string) {
        return instance.put<IBaseResponse>('profile/status', {status: status});
    },

    uploadAvatar(avatar: File) {
        let formData = new FormData();
        formData.append('image', avatar)


        return instance.put<IBaseResponse>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    }
};