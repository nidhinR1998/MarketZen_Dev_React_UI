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
