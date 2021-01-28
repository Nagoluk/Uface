import {loginThunkCreator} from './loginReducer';
import {InferActionsTypes} from './stateRedux';


let initState = {
   initialized: false,
   blackTheme: false,
}


const appReducer = (state = initState, action: ActionsType): AppInitStateT => {
    switch(action.type){
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: true,
            }

        case 'CHANGE_THEME':
            return {
                ...state,
                blackTheme: !state.blackTheme
            }


        default: return state
        
    }
}

export const actionsApp = {
    setInitializedAC: () => ({type: 'SET_INITIALIZED'} as const),
    ChangeThemeAC: () => ({type: 'CHANGE_THEME'} as const)
}


export let initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(loginThunkCreator());
        Promise.all([promise]).then(() => {
            dispatch(actionsApp.setInitializedAC())
        });
    }
}

export default appReducer;


type ActionsType = InferActionsTypes<typeof actionsApp>
export type AppInitStateT = typeof initState
