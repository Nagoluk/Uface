import {createSelector} from "reselect";


const getUsersSelector = state => state.UsersReducer.users;

export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => users.filter(i => true))
//selector with complicated logic .... Z >Z >Z 


export const getPageSizeSelector = state => state.UsersReducer.pageSize;
export const getTototalUsersCountSelector = state => state.UsersReducer.totalUsersCount;
export const getCurrentPageSelector = state => state.UsersReducer.currentPage;
export const getIsFetchingSelector = state => state.UsersReducer.isFetching;
export const getFollowProccesSelector = state => state.UsersReducer.followProcces;
export const getIsLoginedSelector = state => state.LoginReducer.isLogined