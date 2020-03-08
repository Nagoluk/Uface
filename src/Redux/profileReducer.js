import {ProfileAPI} from "../api/api";

const NEW_SYMBOL = "NEW_SYMBOL";
const ADD_NEW_POST = "ADD_NEW_POST";
const SET_PROFILE = "SET_PROFILE";
const SET_STATUS = "SET_STATUS";
const USERS_IS_FETCHING = "USERS_IS_FETCHING ";

let initialProfilePage = {
    PostsData: [
        {id: 1, content: "Cool!", likes: 0, rep: 0, comm: 0, dataSend: "28.07.2019 | 12:26"},
        {id: 2, content: "Hi, how are you?", likes: 0, rep: 0, comm: 0, dataSend: "28.07.2019 | 12:26"},
        {id: 3, content: "Hello Uface!", likes: 0, rep: 0, comm: 0, dataSend: "28.07.2019 | 12:26"},

    ],

    NewPostText: "fff",
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
                PostsData: [{id: 1, content: state.NewPostText, likes: 0, rep: 0, comm: 0, dataSend: currentData},...state.PostsData, ],
                NewPostText: ""
            };

            return stateCopy;

        case NEW_SYMBOL:
            return  {
                ...state,
                NewPostText : action.symbol
            };

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


        default:
            return state;


    }
}

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

export const newSymbolAC = (symbol) => {
    return {
        type: NEW_SYMBOL,
        symbol: symbol
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


export default profileReducer;