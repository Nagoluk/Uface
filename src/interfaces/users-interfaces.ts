import {photosT} from "./profile-interfaces";

export type UserT = {
    name: string,
    id: number,
    uniqueUrlName: string | number | null,
    photos: photosT,
    status: null | string,
    followed: boolean
}
