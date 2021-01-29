import {photosT} from "./profile-interfaces";

export type dialogT = {
    id: string,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: photosT
}

export type messageT = {
    id: string,
    body: string,
    translatedBody: string | null,
    addedAt: string,
    senderId: number,
    senderName: string,
    recipientId: number,
    recipientName: string,
    viewed: boolean,
    deletedBySender: boolean,
    deletedByRecipient: false,
    isSpam: boolean,
    distributionId: any
}
