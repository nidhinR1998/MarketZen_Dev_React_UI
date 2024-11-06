import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOGOUT_SUCCESS,
    SEND_RESET_PASSWORD_REQUEST, SEND_RESET_PASSWORD_SUCCESS, SEND_RESET_PASSWORD_FAILURE,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE
} from "./ActionTypes";

// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
};

// Reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case SEND_RESET_PASSWORD_REQUEST:
        case VERIFY_OTP_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case SEND_RESET_PASSWORD_SUCCESS:
        case VERIFY_OTP_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload };

        case GET_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case SEND_RESET_PASSWORD_FAILURE:
        case VERIFY_OTP_FAILURE:
        case CHANGE_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
};

export default authReducer;
