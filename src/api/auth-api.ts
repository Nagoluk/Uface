import { instance } from './api';
import {IBaseResponse, IResponseWithCaptcha} from '../interfaces/common-interfaces';
import {ICaptcha, ILogin, LoginResponseDataType} from '../interfaces/login-interfaces';

export let AuthAPI = {
    getLogin() {
        return instance.get<IBaseResponse<ILogin>>('auth/me').then(response => response.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<IResponseWithCaptcha<LoginResponseDataType>>('auth/login', {email, password, rememberMe, captcha});
    },

    logout() {
        return instance.delete<IBaseResponse>('auth/login').then(response => response.data);
    },

    getSecureCaptcha () {
        return instance.get<ICaptcha>('security/get-captcha-url').then(response => response.data);
    }

};