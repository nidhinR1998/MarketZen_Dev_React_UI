// State/AiChatBote/Action.js
import axios from "axios";
import { SEND_MESSAGE, RECEIVE_MESSAGE, SET_ERROR } from "./ActionType";
import api from "@/config/api";

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    payload: message,
});

export const receiveMessage = (response) => ({
    type: RECEIVE_MESSAGE,
    payload: response,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const fetchBotResponse = (prompt) => async (dispatch) => {
    // Dispatch the user's message first
    dispatch(sendMessage({ role: "user", text: prompt }));

    try {
        // Call backend API
        const response = await api.post(`/ai/chat/getData` ,
            { prompt }
        );

        // Dispatch the bot's response
        dispatch(receiveMessage({ role: "bot", text: response.data.message }));
    } catch (error) {
        console.error("Error fetching bot response:", error);

        // Dispatch an error message
        dispatch(
            receiveMessage({
                role: "bot",
                text: "Sorry, something went wrong. Please try again later.",
            })
        );
    }
};
