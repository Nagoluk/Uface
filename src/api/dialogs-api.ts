import {instance} from './api';

export let DialogsAPI = {
    getDialogs() {
        return instance.get<any>('dialogs')
    },

    startChating(id: number) {
        return instance.put<any>(`dialogs/${id}`)
    },

    sendMessage(id: number, body: string) {
        return instance.post<any>(`dialogs/${id}/messages`, {body: body}).then(response => response.data)
    },

    getMessages(UserId: number) {
        return instance.get<any>(`dialogs/${UserId}/messages/new?newerThen=2019-4-19`)
    },

    getMessageCount() {
        return instance.get<number>('dialogs/messages/new/count');
    },

    deleteMessage(messageId: string) {
        return instance.delete<any>(`dialogs/messages/${messageId}`)
    }
}
