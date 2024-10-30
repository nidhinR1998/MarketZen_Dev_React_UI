import api from '@/config/api';
import * as types from './ActionTypes';

//Action Creation
export const payOrder =  ({jwt, orderDate, amount}) => async (dispatch) => {
    dispatch({ type: types.PAY_ORDER_REQUEST });

    try {
        const response = await api.post(`/api/orders/pay`, orderDate, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        dispatch({
            type: types.PAY_ORDER_SUCCESS,
            payload: response.data,
            amount
        });
        console.log("order success", response.data)
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: types.PAY_ORDER_FAILURE,
            error: error.message,
        });
        
    }
};

export const getOrderById =  ({jwt, orderId}) => async (dispatch) => {
    dispatch({ type: types.GET_ORDER_REQUEST });

    try {
        const response = await api.get(`/api/orders/${orderId}`,  {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        dispatch({
            type: types.GET_ORDER_SUCCESS,
            payload: response.data,
            
        });
        console.log("Get order", response.data)
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: types.GET_ORDER_FAILURE,
            error: error.message,
        });
        
    }
};

export const getAllOrdersForUser =  ({jwt, orderType, assetSymbol}) => async (dispatch) => {
    dispatch({ type: types.GET_ALL_ORDER_REQUEST });

    try {
        const response = await api.get(`/api/orders`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            params: {
                order_type: orderType,
                asset_symbol: assetSymbol,
            },
        });

        dispatch({
            type: types.GET_ALL_ORDER_SUCCESS,
            payload: response.data,
           
        });
        console.log("Get All order", response.data)
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: types.GET_ALL_ORDER_FAILURE,
            error: error.message,
        });
        
    }
};