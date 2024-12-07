// State/AiChatBote/Reducer.js
import { SEND_MESSAGE, RECEIVE_MESSAGE, SET_ERROR } from "./ActionType";

const initialState = {
    chatHistory: [],
    error: null,
};

const aiChatBotReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
        case RECEIVE_MESSAGE:
            return {
                ...state,
                chatHistory: [...state.chatHistory, action.payload],
                error: null, // Reset error on successful message
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default aiChatBotReducer;
