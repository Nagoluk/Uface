import { loginThunkCreator } from "./loginReducer";

const SET_INITALIZED = "SET_INITALIZED";


let initState = {
   initialized: false
}


const appReducer = (state = initState, action) => {

    switch(action.type){
       
        case SET_INITALIZED:
            return {
                ...state,
                initialized: true
            }
        

        default: return state
        
    }
}

export let setInitializedAC = () => {
    return {type: SET_INITALIZED}
}


export let initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(loginThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(setInitializedAC())
        });
    }
}




export default appReducer;
