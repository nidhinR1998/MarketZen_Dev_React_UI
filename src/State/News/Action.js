import api from '@/config/api';
import * as types from './ActionType';

// Action.js
export const getBusinessNews = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_BUSINESS_NEWS_REQUEST });
    try {
        const response = await api.get(`/api/news/businessNews`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_BUSINESS_NEWS_SUCCESS, payload: response.data });
        console.log("Busines News Data", response.data);
    } catch (error) {
        dispatch({ type: types.GET_BUSINESS_NEWS_FAILURE, error: error.message });
    }
};

export const getCryptoNews = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_CRYPTO_NEWS_REQUEST });
    try {
        const response = await api.get(`/api/news/cryptoNews`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_CRYPTO_NEWS_SUCCESS, payload: response.data });
        console.log("Crypto News Data", response.data);
    } catch (error) {
        dispatch({ type: types.GET_CRYPTO_NEWS_FAILURE, error: error.message });
    }
};

export const getSportsNews = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_CRYPTO_NEWS_REQUEST });
    try {
        const response = await api.get(`/api/news/sportsNews`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_SPORTS_NEWS_SUCCESS, payload: response.data });
        console.log("Sports News Data", response.data);
    } catch (error) {
        dispatch({ type: types.GET_SPORTS_NEWS_FAILURE, error: error.message });
    }
};

export const getPoliticalNews = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_CRYPTO_NEWS_REQUEST });
    try {
        const response = await api.get(`/api/news/politicalNews`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: types.GET_POLITICAL_NEWS_SUCCESS, payload: response.data });
        console.log("Political News Data", response.data);
    } catch (error) {
        dispatch({ type: types.GET_POLITICAL_NEWS_FAILURE, error: error.message });
    }
};
