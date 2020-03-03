const NEW_SYMBOL = "NEW_SYMBOL";
const ADD_NEW_POST = "ADD_NEW_POST";
const SET_PROFILE = "SET_PROFILE";

let initialProfilePage = {
    PostsData: [
        {id: 1, content: "Cool!", likes: 0, rep: 0, comm: 0, dataSend: "28.07.2019 | 12:26"},
        {id: 2, content: "Hi, how are you?", likes: 0, rep: 0, comm: 0, dataSend: "28.07.2019 | 12:26"},
        {id: 3, content: "Hello Uface!", likes: 0, rep: 0, comm: 0, dataSend: "28.07.2019 | 12:26"},

    ],

    NewPostText: "fff",
    profile: null
};

const profileReducer = (state = initialProfilePage, action) =>{
    switch(action.type) {
        case ADD_NEW_POST:
            let now = new Date();
            let addZero = (temp) => {
                return parseInt(temp) < 10 ? "0" + temp : temp;
            }
            let currentData = addZero(now.getDate()) + '.' + addZero(now.getMonth()) + '.' + now.getFullYear() + ' | ' + addZero(now.getHours()) + ':' + addZero(now.getMinutes());


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


        default:
            return state;


    }
}

export const setProfile = (profile) =>{
    return {
        type: SET_PROFILE,
        profile: profile
    }
}

export const newSymbolAC = (symbol) => {
    return {
        type: NEW_SYMBOL,
        symbol: symbol
    }
}

export default profileReducer;