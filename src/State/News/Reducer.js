import * as types from './ActionType';

const initialState = {
    businessArticles: [],
    cryptoArticles: [],
    sportsArticles: [],
    politicalArticles: [],
    loading: false,
    error: null,
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BUSINESS_NEWS_REQUEST:
        case types.GET_CRYPTO_NEWS_REQUEST:
        case types.GET_SPORTS_NEWS_REQUEST:
        case types.GET_POLITICAL_NEWS_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case types.GET_BUSINESS_NEWS_SUCCESS:
            return {
                ...state,
                businessArticles: action.payload.articles,
                loading: false,
                error: null,
            };
        case types.GET_CRYPTO_NEWS_SUCCESS:
            return {
                ...state,
                cryptoArticles: action.payload.articles,
                loading: false,
                error: null,
            };
            case types.GET_SPORTS_NEWS_SUCCESS:
            return {
                ...state,
                sportsArticles: action.payload.articles,
                loading: false,
                error: null,
            };
            case types.GET_POLITICAL_NEWS_SUCCESS:
            return {
                ...state,
                politicalArticles: action.payload.articles,
                loading: false,
                error: null,
            };
        case types.GET_BUSINESS_NEWS_FAILURE:
        case types.GET_CRYPTO_NEWS_FAILURE:
        case types.GET_SPORTS_NEWS_FAILURE:
        case types.GET_POLITICAL_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default newsReducer;
