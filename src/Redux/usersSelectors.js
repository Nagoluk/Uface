
export const getUsersSelector = state => state.UsersReducer.users;
export const getPageSizeSelector = state => state.UsersReducer.pageSize;
export const getTototalUsersCountSelector = state => state.UsersReducer.totalUsersCount;
export const getCurrentPageSelector = state => state.UsersReducer.currentPage;
export const getIsFetchingSelector = state => state.UsersReducer.isFetching;
export const getFollowProccesSelector = state => state.UsersReducer.followProcces;
export const getIsLoginedSelector = state => state.LoginReducer.isLogined