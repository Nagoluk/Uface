import {loginThunkCreator} from "./loginReducer";
const SET_INITIALIZED: string = "SET_INITIALIZED";
const CHANGE_THEME: string = "CHANGE_THEME"

export type IntitState = {
    initialized: boolean,
    blackTheme: boolean,
}

let initState: IntitState = {
   initialized: false,
   blackTheme: false,
}


const appReducer = (state = initState, action: any): IntitState => {
    switch(action.type){
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }

        case CHANGE_THEME:
            return {
                ...state,
                blackTheme: !state.blackTheme
            }


        default: return state
        
    }
}
type SetInitializedACType = {type: typeof SET_INITIALIZED }
export let setInitializedAC = ():SetInitializedACType => ({type: SET_INITIALIZED})

type ChangeThemeACT = {type: typeof CHANGE_THEME}
export const ChangeThemeAC = ():ChangeThemeACT => ({type: CHANGE_THEME})



export let initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(loginThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(setInitializedAC())
        });
    }
}

export default appReducer;
