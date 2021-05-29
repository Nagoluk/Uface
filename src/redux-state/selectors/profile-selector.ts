import {AppStateType} from '../stateRedux';

export const getProfileSelector = (state: AppStateType) => (state.ProfilePage.profile)
export const getIsProfileFetching = (state: AppStateType) => (state.ProfilePage.isFetching)
export const getMyPostsSelector = (state: AppStateType) => (state.ProfilePage.PostsData)
export const getStatusSelector = (state: AppStateType) => (state.ProfilePage.status)
export const getProfileErrorSelector = (state: AppStateType) => (state.ProfilePage.setProfileErrors)
export const getIsFollowedSelector = (state: AppStateType) => (state.ProfilePage.isFollowed)
