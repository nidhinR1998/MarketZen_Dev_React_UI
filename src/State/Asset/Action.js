import api from "@/config/api";
import * as types from "./ActionType";

export const getAssetById = ({ assetId, jwt }) => async (dispatch) => {
    dispatch({ type: types.GET_ASSET_REQUEST });

    try {
        const response = await api.get(`/api/assets/${assetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({
            type: types.GET_ASSET_SUCCESS,
            payload: response.data,
        });
        console.log("get asset by id",response.data);
    } catch (error) {
        dispatch({
            type: types.GET_ASSET_FAILURE,
            error: error.message,
        });
        
    }
};

export const getAssetDetails = ({ coinId, jwt }) => async (dispatch) => {
    dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });

    try {
        const response = await api.get(`/api/assets/coin/${coinId}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({
            type: types.GET_ASSET_DETAILS_SUCCESS,
            payload: response.data,
        });
        console.log("asset details",response.data);
    } catch (error) {
        console.log("asset details error",error.response?.data);
        dispatch({
            type: types.GET_ASSET_DETAILS_FAILURE,
            error: error.message,
        });
        
    }
};

export const getUserAsset = ( jwt ) => async (dispatch) => {
    dispatch({ type: types.GET_USER_ASSET_REQUEST });

    try {
        const response = await api.get(`/api/assets`, {
            headers:{
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({
            type: types.GET_USER_ASSET_SUCCESS,
            payload: response.data,
        });
        console.log("Get USer asset",response.data);
    } catch (error) {
        console.log("Get USer asset",error.response?.data);
        dispatch({
            type: types.GET_USER_ASSET_FAILURE,
            error: error.message,
        });
        
    }
};
