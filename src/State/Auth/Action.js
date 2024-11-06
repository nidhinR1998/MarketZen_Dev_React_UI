import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEND_RESET_PASSWORD_FAILURE, SEND_RESET_PASSWORD_REQUEST, SEND_RESET_PASSWORD_SUCCESS, VERIFY_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS } from "./ActionTypes";


export const register=(userData) => async(dispatch)=>{

    dispatch({type:REGISTER_REQUEST})

    const baseUrl ="http://localhost:5454"


    try {
        const response=await axios.post(`${baseUrl}/auth/signup`,userData);
        const user=response.data;
        console.log(user);

        dispatch({type:REGISTER_SUCCESS,payload:user.jwt});
        localStorage.setItem("jwt",user.jwt)


    } catch (error) {
        dispatch({type:REGISTER_FAILURE,payload:error.message});
        console.log(error);

    }

};

export const login=(userData) => async(dispatch)=>{

    dispatch({type:LOGIN_REQUEST})

    const baseUrl ="http://localhost:5454"

    try {
        const response=await axios.post(`${baseUrl}/auth/signin`,userData.data);
        const user=response.data;
        console.log(user);

        dispatch({type:LOGIN_SUCCESS,payload:user.jwt});
        localStorage.setItem("jwt",user.jwt)
        userData.navigate("/")

    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error.message});
        console.log(error);

    }

};


export const getUser=(jwt) => async(dispatch)=>{

    dispatch({type:GET_USER_REQUEST})

    const baseUrl ="http://localhost:5454"


    try {
        const response=await axios.get(`${baseUrl}/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        const user=response.data;
        console.log(user);


        dispatch({type:GET_USER_SUCCESS,payload:user})


    } catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error.message})
        console.log(error);

    }

};

export const forgotPassword = (userData, navigate) => async (dispatch) => {
    dispatch({ type: SEND_RESET_PASSWORD_REQUEST });

    const baseUrl = "http://localhost:5454";

    try {
        const response = await axios.post(`${baseUrl}/auth/forgot-password`, userData);
        const user = response.data;
        console.log(user);

        // Check if JWT and session exist, then redirect
        if (user.jwt && user.session) {
            dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: user.jwt });
            localStorage.setItem("jwt", user.jwt);
            localStorage.setItem("session", user.session);            
            // Redirect to EmailOTPForm page
            navigate("/email-otp");
        } else {
            throw new Error("Failed to get JWT or session data");
        }
    } catch (error) {
        dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const verifyOtp = (otp, navigate) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });

    const baseUrl = "http://localhost:5454";
    const jwt = localStorage.getItem("jwt");
    const session = localStorage.getItem("session");

    try {
        const response = await axios.get(`${baseUrl}/auth/two-factor/otp/${otp}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            params: {
                id: session,
                jwt: jwt
            }
        });
        
        const data = response.data;
        console.log("OTP verified successfully:", data);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
        
        // Navigate to the desired page after successful verification
        navigate("/change-password"); 
    } catch (error) {
        dispatch({ type: VERIFY_OTP_FAILURE, payload: error.message });
        console.error("Error verifying OTP:", error);
    }
};

export const changePassword = (userData,navigate) => async (dispatch) => {
    dispatch({ type: SEND_RESET_PASSWORD_REQUEST });

    const baseUrl = "http://localhost:5454";
    const jwt = localStorage.getItem("jwt");
    const session = localStorage.getItem("session");

    try {
        const response = await axios.post(`${baseUrl}/auth/change-password`, userData, {
            params: {
                id: session,
                jwt: jwt
            }
        });

        const user = response.data;
        console.log(user);

        // Check for success message in the response
        if (user.status) {
            dispatch({ type: SEND_RESET_PASSWORD_SUCCESS, payload: user.jwt });
            localStorage.setItem("jwt", user.jwt);
           navigate("/login")
        }
    } catch (error) {
        dispatch({ type: SEND_RESET_PASSWORD_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const logout = () => (dispatch) => {
   // localStorage.removeItem("jwt");
   localStorage.clear();
    dispatch({ type: LOGOUT_SUCCESS });
};