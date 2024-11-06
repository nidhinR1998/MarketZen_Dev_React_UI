import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Navbar from "./page/Navbar/Navbar";
import Portfolio from "./page/Portfolio/Portfolio";
import Activity from "./page/Activity/Activity";
import Wallet from "./page/Wallet/Wallet";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import PaymantDetails from "./page/PaymantDetails/PaymantDetails";
import StockDetails from "./page/Stock Details/StockDetails";
import Watchlist from "./page/Watchlist/Watchlist";
import Profile from "./page/Profile/Profile";
import SearchCoin from "./page/Search/SearchCoin";
import Notfound from "./page/Notfound/Notfound";
import Auth from "./page/Auth/Auth";
import EmailOTPForm from "./page/Auth/EamilOTPForm"; // Import EmailOTPForm
import { useDispatch, useSelector } from "react-redux";
import { store } from "./State/Store";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";
import ChangePasswordForm from "./page/Auth/ChangePasswordForm";

function App() {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        // Set expiration time if JWT exists
        if (auth.jwt) {
            localStorage.setItem('expirationTime', Date.now() + 3600000); // Set expiration time to 1 hour
        }
        
        // Dispatch getUser if JWT is available either in state or localStorage
        const jwt = auth.jwt || localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [auth.jwt, dispatch]);

    return (
        <>
            {auth.user ? (
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/withdrawal" element={<Withdrawal />} />
                        <Route path="/payment-details" element={<PaymantDetails />} />
                        <Route path="/market/:id" element={<StockDetails />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<SearchCoin />} />
                        {/* Email OTP and Change Password routes accessible without auth */}
                        {/* <Route path="/email-otp" element={<EmailOTPForm />} /> 
                        <Route path="/change-password" element={<ChangePasswordForm />} />
                        <Route path="*" element={<Notfound />} /> */}
                    </Routes>
                </div>
            ) : (
                // Public routes or redirect to Auth
                <Routes>
                    <Route path="/email-otp" element={<EmailOTPForm />} /> 
                    <Route path="/change-password" element={<ChangePasswordForm />} />
                    <Route path="*" element={<Auth />} />
                </Routes>
            )}
        </>
    );
}

export default App;



