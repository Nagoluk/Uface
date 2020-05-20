import {UsersAPI, unfollowAPI, followAPI} from "../api/api"
import {setFollowAC} from "./profileReducer";
import {photosT} from "./messageReducer";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOW_IN_PROCESS = "TOGGLE_FOLLOW_IN_PROCESS";
const SET_CURRENT_PAGE_PAGITATOR = "SET_CURRENT_PAGE_PAGITATOR";
const SET_FOUNDED_USERS = "SET_FOUNDED_USERS";


type UserT = {
    name: string,
    id: number,
    uniqueUrlName: string | number | null,
    photos: photosT,
    status: null | string,
    followed: boolean
}


let initialUsers = {
    users: [] as Array<UserT>,
    pageSize: 12 as number,
    totalUsersCount: 16 as number,
    currentPage: 1 as number,
    currentPagePagitator: 0 as number,
    isFetching: true as boolean,
    followProcces: [] as Array<number>,
    foundedUsers: [] as Array<UserT>
};

export type InitialUsersT = typeof initialUsers;

const usersReducer = (state = initialUsers, action: any): InitialUsersT =>{
    switch(action.type) {
        case FOLLOW:
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.usedID) {
                    let uc = {...u, followed: true};
                    
                    return uc;
                }
                return u;
            })
        }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.usedID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }

        case SET_CURRENT_PAGE:
            return  {
                ...state,
                currentPage: action.page
            }

        case SET_TOTAL_USERS_COUNT:
            return  {
                ...state,
                totalUsersCount: action.count

            }

        case TOGGLE_IS_FETCHING:
            return  {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_FOLLOW_IN_PROCESS: 
            return {
                ...state,
                followProcces: action.isFetchingFollow ? 
                [...state.followProcces, action.userID] : state.followProcces.filter(id => id !== action.userID)
            }

        case SET_CURRENT_PAGE_PAGITATOR:
            return {
                ...state,
                currentPagePagitator: action.payload
            }
        case SET_FOUNDED_USERS: {
            return {
                ...state,
                foundedUsers: action.items
            }
        }

        default:
            return state;
    }
}

type followACT = {type: typeof FOLLOW, userID: number}
export const follow = (userID: number): followACT =>({type: FOLLOW, userID});

type unFollowACT = {type: typeof UNFOLLOW, userID: number }
export const unfollow = (userID: number): unFollowACT => ({type: UNFOLLOW, userID});

type setUsersACT = {type: typeof SET_USERS, users: Array<UserT> }
export const setUsers = (users: Array<UserT>): setUsersACT => ({type: SET_USERS, users});

type setCurrentPageACT = {type: typeof SET_CURRENT_PAGE, page: number}
export const setCurrentPage = (page: number): setCurrentPageACT => ({type: SET_CURRENT_PAGE, page});

type setTotalCountACT = {type: typeof SET_TOTAL_USERS_COUNT, count: number}
export const setTotalCount = (count: number): setTotalCountACT => ({type: SET_TOTAL_USERS_COUNT, count});

type toggleFetchingACT = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const ToggleFetching = (isFetching: boolean): toggleFetchingACT => ({type: TOGGLE_IS_FETCHING, isFetching});

type toggleFollowProcessingACT = {type: typeof TOGGLE_FOLLOW_IN_PROCESS, usedID: number, isFetchingFollow: boolean}
export const toggleFollowProcessing = (usedID: number, isFetchingFollow: boolean):toggleFollowProcessingACT => ({type: TOGGLE_FOLLOW_IN_PROCESS, usedID, isFetchingFollow});

type setCurrentPagePagitatorACT = {type: typeof SET_CURRENT_PAGE_PAGITATOR, payload: number}
export const setCurrentPagePagitator =  (payload: number): setCurrentPagePagitatorACT => ({type: SET_CURRENT_PAGE_PAGITATOR, payload});

type setFoundedUsersACT = {
    type: typeof SET_FOUNDED_USERS,
    items: Array<UserT>
}
export const setFoundedUsers = (items: Array<UserT>): setFoundedUsersACT => ({type: SET_FOUNDED_USERS, items})

export const setUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(ToggleFetching(true));
        UsersAPI.getUsers(currentPage, pageSize).then((data: any) => {
        
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
            dispatch(ToggleFetching(false));

        });
    }
}

export const followThunkCreator = (userID: number) => {
    return (dispatch: any)=> {
        dispatch(toggleFollowProcessing(userID, true));

        followAPI(userID).then((data: any) => {
                if(data.resultCode === 0) {
                    dispatch(follow(userID))
                    dispatch(setFollowAC(true))
                }


        dispatch(toggleFollowProcessing(userID, false))

      })
    }
}


export const unfollowThunkCreator = (userID: number) => {
    return (dispatch: any)=> {
        dispatch(toggleFollowProcessing(userID, true));

        unfollowAPI(userID).then((data: any) => {
                if(data.resultCode === 0) {
                    dispatch(unfollow(userID))
                    dispatch(setFollowAC(false))
                }

        dispatch(toggleFollowProcessing(userID, false))
      })
    }
}


export const searchingThunkCreator = (text: string) => {
    return (dispatch: any)=> {
        // dispatch(toggleFollowProcessing(userID, true));

        UsersAPI.Search(text).then((data: any) => {

            if(data.status === 200) dispatch(setFoundedUsers(data.data.items))
        })
    }
}


export default usersReducer;