const addNewMessage = "ADD-NEW-MESSAGE";
const addNewSymbol = "NEW-SYMBOL-MESSAGE";


let initialMessage =  {
    dialogs: [],
    messageData: [
    {message: "Пешка навального"},
    {message: "Либераху прорвало"},
    {message: " Reply from server: неплохо получается "},
    {message: " неплохо получается "}
],
    updateMessageData: "gg",};

const messageReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case addNewMessage:

            return {
                ...state,
                messageData: [{message: state.updateMessageData}, ...state.messageData],
                updateMessageData: ""

            }

        case addNewSymbol:
            return  {
                ...state,
                updateMessageData: action.symbol,
            }

        default:
            return state;
    }

}

export default messageReducer;