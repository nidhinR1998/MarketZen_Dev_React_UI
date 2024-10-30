import { useSelector } from 'react-redux';
import * as types from './ActionTypes';
import api from '@/config/api';



//Action Creation
export const getUserWatchlist =  (jwt) => async (dispatch) => {
    
    dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

    try {
        const response = await api.get(`/api/watchlist/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        dispatch({
            type: types.GET_USER_WATCHLIST_SUCCESS,
            payload: response.data,
        });
        console.log("Usser Watchlist", response.data)
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: types.GET_USER_WATCHLIST_FAILURE,
            error: error.message,
        });
        
    }
};

export const addItemToWatchlist =  ({coinId,jwt}) => async (dispatch) => {
    dispatch({ type: types.ADD_COIN_TO_WATCHLIST__REQUEST });

    try {
        const response = await api.patch(`/api/watchlist/add/coin/${coinId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        dispatch({
            type: types.ADD_COIN_TO_WATCHLIST__SUCCESS,
            payload: response.data,
            
        });
        console.log("Add coin to watchlist", response.data)
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: types.ADD_COIN_TO_WATCHLIST__FAILURE,
            error: error.message,
        });
        
    }
};
