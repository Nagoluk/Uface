import {loginThunkCreator} from "./loginReducer";
const SET_INITIALIZED: string = "SET_INITIALIZED";

export type IntitState = {
    initialized: boolean
}

let initState: IntitState = {
   initialized: false
}


const appReducer = (state = initState, action: any): IntitState => {
    switch(action.type){
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }

        default: return state
        
    }
}
type SetInitializedACType = {type: typeof SET_INITIALIZED }

export let setInitializedAC = ():SetInitializedACType => ({type: SET_INITIALIZED})

export let initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(loginThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(setInitializedAC())
        });
    }
}

export default appReducer;
