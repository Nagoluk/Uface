import {InferActionsTypes} from "./stateRedux";

let initialSetting = {
    eng: true,
    ua: false,
};

const setLang = (state = initialSetting, action: ActionsType): initialSettingPageType =>{


    switch(action.type) {
        case 'SET_UA':

        return {
            ...state,
            eng: false, ua: true
        }


        case 'SET_ENG':

            return{
                ...state,
               eng: true, ua: false
            }
        default:
            return state;
    }
}

const actionsSetting = {
    setUa: () =>({type: 'SET_UA'} as const),
    setEng: () => ({type: 'SET_ENG'} as const)
}

type ActionsType = InferActionsTypes<typeof actionsSetting>
type initialSettingPageType = typeof initialSetting;


export default setLang;