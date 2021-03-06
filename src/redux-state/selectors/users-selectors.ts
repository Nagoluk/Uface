import {AppStateType} from '../stateRedux';


export const getUsersSelector = (state: AppStateType) => state.UsersReducer.users;
export const getPageSizeSelector = (state: AppStateType) => state.UsersReducer.pageSize;
export const getTotalUsersCountSelector = (state: AppStateType) => state.UsersReducer.totalUsersCount;
export const getCurrentPageSelector = (state: AppStateType) => state.UsersReducer.currentPage;
export const getIsFetchingSelector = (state: AppStateType) => state.UsersReducer.isFetching;
export const getPagePagitator = (state: AppStateType) => state.UsersReducer.currentPagePagitator;
export const getFollowProccesSelector = (state: AppStateType) => state.UsersReducer.followProcess;
export const getIsLoginedSelector = (state: AppStateType) => state.LoginReducer.isLogined;
export const getUsersErrorSelector = (state: AppStateType) => state.UsersReducer.error