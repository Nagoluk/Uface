import {AppStateType} from '../stateRedux';

export const getProfileSelector = (state: AppStateType) => (state.ProfilePage.profile)
export const getIsProfileFetching = (state: AppStateType) => (state.ProfilePage.isFetching)
export const getMyPostsSelector = (state: AppStateType) => (state.ProfilePage.PostsData)
export const getStatusSelector = (state: AppStateType) => (state.ProfilePage.status)
