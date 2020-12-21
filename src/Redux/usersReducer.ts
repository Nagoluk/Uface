import {UsersAPI, unfollowAPI, followAPI} from "../api/api"

import {photosT} from "./messageReducer";
import {AppStateType, InferActionsTypes} from "./stateRedux";
import {Dispatch} from "redux";


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOW_IN_PROCESS = "TOGGLE_FOLLOW_IN_PROCESS";
const SET_CURRENT_PAGE_PAGITATOR = "SET_CURRENT_PAGE_PAGITATOR";
const SET_FOUNDED_USERS = "SET_FOUNDED_USERS";


export type UserT = {
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

const usersReducer = (state = initialUsers, action: ActionTypes): InitialUsersT =>{
    switch(action.type) {
        case FOLLOW:
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userID) {
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
                    if(u.id === action.userID) {
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

export const UsersActions = {
    follow: (userID: number) => ({type: FOLLOW, userID} as const),
    unfollow: (userID: number) => ({type: UNFOLLOW, userID} as const),
    setUsers: (users: Array<UserT>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (page: number) => ({type: SET_CURRENT_PAGE, page} as const),
    setTotalCount: (count: number) => ({type: SET_TOTAL_USERS_COUNT, count} as const),
    ToggleFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowProcessing: (userID: number, isFetchingFollow: boolean) => ({type: TOGGLE_FOLLOW_IN_PROCESS, userID, isFetchingFollow} as const),
    setCurrentPagePagitator: (payload: number) => ({type: SET_CURRENT_PAGE_PAGITATOR, payload} as const),
    setFoundedUsers: (items: Array<UserT>) => ({type: SET_FOUNDED_USERS, items} as const)
}


type ActionTypes = InferActionsTypes<typeof UsersActions>;



//Первый вариант типизации санки
type getStateType = () => AppStateType
type currentDispatchType = Dispatch<ActionTypes>

export const setUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: currentDispatchType, getState: getStateType) => {

        dispatch(UsersActions.setCurrentPage(currentPage));
        dispatch(UsersActions.ToggleFetching(true));
        UsersAPI.getUsers(currentPage, pageSize).then((data: any) => {
        
            dispatch(UsersActions.setUsers(data.items));
            dispatch(UsersActions.setTotalCount(data.totalCount));
            dispatch(UsersActions.ToggleFetching(false));

        });
    }
}


export const followThunkCreator = (userID: number) => {
    return (dispatch: currentDispatchType, getState: getStateType)=> {
        dispatch(UsersActions.toggleFollowProcessing(userID, true));

        followAPI(userID).then((data: any) => {
                if(data.resultCode === 0) {
                    dispatch(UsersActions.follow(userID))
                    // dispatch(setFollowAC(true))
                }


        dispatch(UsersActions.toggleFollowProcessing(userID, false))

      })
    }
}


export const unfollowThunkCreator = (userID: number) => {
    return (dispatch: currentDispatchType, getState: getStateType)=> {
        dispatch(UsersActions.toggleFollowProcessing(userID, true));

        unfollowAPI(userID).then((data: any) => {
                if(data.resultCode === 0) {
                    dispatch(UsersActions.unfollow(userID))
                    // dispatch(setFollowAC(false))
                }

        dispatch(UsersActions.toggleFollowProcessing(userID, false))
      })
    }
}


export const searchingThunkCreator = (text: string) => {
    return (dispatch: currentDispatchType, getState: getStateType)=> {
        // dispatch(toggleFollowProcessing(userID, true));

        UsersAPI.Search(text).then((data: any) => {

            if(data.status === 200) dispatch(UsersActions.setFoundedUsers(data.data.items))
        })
    }
}


export default usersReducer;