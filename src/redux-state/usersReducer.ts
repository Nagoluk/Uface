import {AppStateType, InferActionsTypes} from './stateRedux';
import {Dispatch} from 'redux';
import {UserT} from '../interfaces/users-interfaces';
import { UsersAPI } from '../api/users-api';
import {IFilters} from '../interfaces/common-interfaces';
import {message} from 'antd';
import {actionsProfile} from './profileReducer';


let initialUsers = {
    users: [] as Array<UserT>,
    pageSize: 9,
    totalUsersCount: 0,
    currentPage: 1,
    currentPagePagitator: 0,
    isFetching: true,
    followProcess: [] as Array<number>,
    foundedUsers: [] as Array<UserT>,
    error: '' as string,
};

const usersReducer = (state = initialUsers, action: ActionTypes): InitialUsersT => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        let uc = {...u, followed: true};

                        return uc;
                    }
                    return u;
                })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
            }

        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            }

        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count

            }

        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }

        case 'TOGGLE_FOLLOW_IN_PROCESS':
            return {
                ...state,
                followProcess: action.isFetchingFollow ?
                    [...state.followProcess, action.userID] : state.followProcess.filter(id => id !== action.userID)
            }

        case 'SET_CURRENT_PAGE_PAGITATOR':
            return {
                ...state,
                currentPagePagitator: action.payload
            }
        case 'SET_FOUNDED_USERS': {
            return {
                ...state,
                foundedUsers: action.items
            }
        }

        case 'SET_ERROR': {
            return {
                ...state,
                error: action.error
            }
        }

        default:
            return state;
    }
}

export const UsersActions = {
    follow: (userID: number) => ({type: 'FOLLOW', userID} as const),
    unfollow: (userID: number) => ({type: 'UNFOLLOW', userID} as const),
    setUsers: (users: Array<UserT>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (page: number) => ({type: 'SET_CURRENT_PAGE', page} as const),
    setTotalCount: (count: number) => ({type: 'SET_TOTAL_USERS_COUNT', count} as const),
    ToggleFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowProcessing: (userID: number, isFetchingFollow: boolean) => ({
        type: 'TOGGLE_FOLLOW_IN_PROCESS',
        userID,
        isFetchingFollow
    } as const),
    setCurrentPagePagitator: (payload: number) => ({type: 'SET_CURRENT_PAGE_PAGITATOR', payload} as const),
    setFoundedUsers: (items: Array<UserT>) => ({type: 'SET_FOUNDED_USERS', items} as const),
    setError: (error: string) => ({type: 'SET_ERROR', error} as const)
}


//Первый вариант типизации санки
type getStateType = () => AppStateType
type currentDispatchType = Dispatch<ActionTypes>

export const setUsersThunkCreator = (currentPage: number, pageSize: number, filters: IFilters) => {
    return (dispatch: currentDispatchType, getState: getStateType) => {
        dispatch(UsersActions.setError(''))
        dispatch(UsersActions.setCurrentPage(currentPage));
        dispatch(UsersActions.ToggleFetching(true));
        UsersAPI.getUsers(currentPage, pageSize, filters).then((data: any) => {
            dispatch(UsersActions.setUsers(data.items));
            dispatch(UsersActions.setTotalCount(data.totalCount));
        }).catch(() => {
            dispatch(UsersActions.setError('Network error'))
        }).finally(() => {
            dispatch(UsersActions.ToggleFetching(false));
        });
    }
}


export const followThunkCreator = (userID: number, fromProfile = false) => {
    return (dispatch: any) => {
        dispatch(UsersActions.toggleFollowProcessing(userID, true));

        UsersAPI.followAPI(userID).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(UsersActions.follow(userID))
                if(fromProfile) dispatch(actionsProfile.setFollowAC(true))
            }

        }).catch(() => {
            message.error('Cannot follow')
        }).finally(() => {
            dispatch(UsersActions.toggleFollowProcessing(userID, false))
        })
    }
}


export const unfollowThunkCreator = (userID: number, fromProfile = false) => {
    return (dispatch: any, getState: getStateType) => {
        dispatch(UsersActions.toggleFollowProcessing(userID, true));
        UsersAPI.unfollowAPI(userID).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(UsersActions.unfollow(userID))
                if(fromProfile) dispatch(actionsProfile.setFollowAC(false))
            }

        }).catch(() => {
            message.error('Cannot unfollow')
        }).finally(() => {
            dispatch(UsersActions.toggleFollowProcessing(userID, false))
        })
    }
}


export default usersReducer;

export type InitialUsersT = typeof initialUsers;
type ActionTypes = InferActionsTypes<typeof UsersActions>;
