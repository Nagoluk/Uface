import {createSelector} from "reselect";
import {AppStateType} from "./stateRedux";


const getUsersSelector = (state: AppStateType) => state.UsersReducer.users;

export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => users.filter(i => true))
//selector with complicated logic .... Z >Z >Z 


export const getPageSizeSelector = (state: AppStateType) => state.UsersReducer.pageSize;
export const getTototalUsersCountSelector = (state: AppStateType) => state.UsersReducer.totalUsersCount;
export const getCurrentPageSelector = (state: AppStateType) => state.UsersReducer.currentPage;
export const getIsFetchingSelector = (state: AppStateType) => state.UsersReducer.isFetching;
export const getPagePagitator = (state: AppStateType) => state.UsersReducer.currentPagePagitator;
export const getFollowProccesSelector = (state: AppStateType) => state.UsersReducer.followProcess;
export const getIsLoginedSelector = (state: AppStateType) => state.LoginReducer.isLogined;