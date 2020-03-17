import {UsersAPI, unfollowAPI, followAPI} from "../api/api"

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOW_IN_PROCESS = "TOGGLE_FOLLOW_IN_PROCESS";
const SET_CURRENT_PAGE_PAGITATOR = "SET_CURRENT_PAGE_PAGITATOR";


let initialUsers = {
    users: [],
    pageSize: 9,
    totalUsersCount: 16,
    currentPage: 1,
    currentPagePagitator: 0,
    isFetching: true,
    followProcces: []
};

const usersReducer = (state = initialUsers, action) =>{
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
                [...state.followProcces, action.usedID] : state.followProcces.filter(id => id !== action.usedID)
            }

        case SET_CURRENT_PAGE_PAGITATOR:
            return {
                ...state,
                currentPagePagitator: action.payload
            }


        default:
            return state;
    }
}


export const follow = (usedID) =>({type: FOLLOW, usedID});
export const unfollow = (usedID) => ({type: UNFOLLOW, usedID});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
export const ToggleFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowProcessing = (usedID, isFetchingFollow) => ({type: TOGGLE_FOLLOW_IN_PROCESS, usedID, isFetchingFollow});
export const setCurrentPagePagitator =  (payload) => ({type: SET_CURRENT_PAGE_PAGITATOR, payload})

export const setUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(ToggleFetching(true));
        UsersAPI.getUsers(currentPage, pageSize).then(data => {
        
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
            dispatch(ToggleFetching(false));

        });
    }
}

export const followThunkCreator = (userID) => {
    return (dispatch)=> {
        dispatch(toggleFollowProcessing(userID, true));

        followAPI(userID).then(data => {
                if(data.resultCode === 0) dispatch(follow(userID))

        dispatch(toggleFollowProcessing(userID, false))
      })
    }
}


export const unfollowThunkCreator = (userID) => {
    return (dispatch)=> {
        dispatch(toggleFollowProcessing(userID, true));

        unfollowAPI(userID).then(data => {
                if(data.resultCode === 0) dispatch(unfollow(userID))

        dispatch(toggleFollowProcessing(userID, false))
      })
    }
}






export default usersReducer;