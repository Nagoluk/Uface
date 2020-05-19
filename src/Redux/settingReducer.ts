
const SET_UA = "SET_UA";
const SET_ENG = "SET_ENG";

let initialUsers = {
    eng: true as boolean,
    ua: false as boolean,
};

const setLang = (state = initialUsers, action: any) =>{


    switch(action.type) {
        case SET_UA:

        return {
            ...state,
            eng: false, ua: true
        }


        case SET_ENG:

            return{
                ...state,
               eng: true, ua: false
            }
        default:
            return state;
    }
}


export const setUa = () =>({type: SET_UA});
export const setEng = () => ({type: SET_ENG});


export default setLang;