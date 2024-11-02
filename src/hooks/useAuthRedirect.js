// src/hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('jwt');
            const expirationTime = localStorage.getItem('expirationTime');

            // Check if token is expired (1 hour = 3600000 ms)
            if (!token || (expirationTime && Date.now() > expirationTime)) {
                alert("Token has expired, please login again.");
                localStorage.removeItem('jwt');
                localStorage.removeItem('expirationTime');
                navigate('/login');
            }
        };

        // Clear token after 1 hour
        const expirationTimeout = setTimeout(() => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('expirationTime');
            alert("Session expired due to inactivity. Please login again.");
            navigate('/login');
        }, 3600000); // 1 hour in milliseconds

        const intervalId = setInterval(checkToken, 60000); // Check every 60 seconds

        // Detect if Developer Tools are opened
        const devToolsOpened = () => {
            alert("Developer Tools detected, session will be terminated.");
            localStorage.removeItem('jwt');
            localStorage.removeItem('expirationTime');
            navigate('/login');
        };

        const detectDevTools = () => {
            const devToolsOpen = window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100;
            if (devToolsOpen) {
                devToolsOpened();
            }
        };

        const devToolsInterval = setInterval(detectDevTools, 1000); // Check every second

        return () => {
            clearTimeout(expirationTimeout);
            clearInterval(intervalId);
            clearInterval(devToolsInterval);
        };
    }, [navigate]);
};

export default useAuthRedirect;
