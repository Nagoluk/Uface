import {ProfileAPI} from "../api/api";

const ADD_NEW_POST = "ADD_NEW_POST";
const SET_PROFILE = "SET_PROFILE";
const SET_STATUS = "SET_STATUS";
const USERS_IS_FETCHING = "USERS_IS_FETCHING ";
const DELETE_POST = "DELETE_POST";
const SET_AVATAR_SUCCESS = "SET_AVATAR_SUCCESS";


let initialProfilePage = {
    PostsData: [
        {id: 1, content: "Hello Uface!", likes: 0, rep: 0, comm: 0, dataSend: "Sun Mar 15 2020 18:44:42"},
        {id: 2, content: "Test", likes: 0, rep: 0, comm: 0, dataSend: "Sun Mar 15 2020 18:44:42"},

    ],

    profile: null,
    status: "",
    isFetching: true,
};

const profileReducer = (state = initialProfilePage, action) =>{
    switch(action.type) {
        case ADD_NEW_POST:
           
            let currentData = new Date().toString().slice(0, 24);


            let stateCopy = {
                ...state,
                PostsData: [...state.PostsData, {id: 1, content: action.text, likes: 0, rep: 0, comm: 0, dataSend: currentData}],
            };

            return stateCopy;


        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        
        case SET_STATUS: 
            return {
                ...state,
                status: action.status
            };

        case USERS_IS_FETCHING : {
           
            return {
                ...state,
                isFetching: action.payload
            }
        }

        case DELETE_POST: {

            return {
                ...state,
                PostsData: state.PostsData.filter(item => item.id !== action.id)
            }
        }

        case SET_AVATAR_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }


        default:
            return state;

    }
}

export const addNewPostAC = text => ({type: ADD_NEW_POST, text})
export const deletePostAC = id => ({type: DELETE_POST, id})
export const savePhotoSuccess = (photos) => ({type: SET_AVATAR_SUCCESS, photos})

export const isFetchingAC = (condition) => {
    return {
        type: USERS_IS_FETCHING ,
        payload: condition
    }
}

export const setProfile = (profile) =>{
    return {
        type: SET_PROFILE,
        profile: profile
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}


export const getProfileThunkCreator = (id) => {

    return (dispatch) =>{
        dispatch(isFetchingAC(true))

        ProfileAPI.getProfile(id).then(response => {
            
            dispatch(setProfile(response.data))
            dispatch(isFetchingAC(false))
        });
    }
}

export const getStatusThunkCreator = (id) => {
    return (dispatch)=>{
        ProfileAPI.getStatus(id).then(response => {
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatusThunkCreator = (status) => {
    return (dispatch)=>{
        ProfileAPI.updateStatus(status).then(response => {
            if(response.data.resultCode === 0)
                dispatch(setStatus(status))
        })
    }
}

export const uploadAvatarThunkCreator = (avatar) => {
    return (dispatch)=>{
        ProfileAPI.uploadAvatar(avatar).then(response => {

            if(response.resultCode === 0){
                dispatch(savePhotoSuccess(response.data.photos))
            }

        })
    }
}

export const putUserDataThunkCreator = (data) => {
    return (dispatch)=>{
        ProfileAPI.putProfileData(data).then(response => {

            if(response.data.resultCode === 0){

            }

        })
    }
}




export default profileReducer;