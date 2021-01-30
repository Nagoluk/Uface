import {AppStateType} from '../stateRedux';

export const getProfileSelector = (state: AppStateType) => (state.ProfilePage.profile)
