import { createContext, useState, useEffect } from "react";
const AuthContext = createContext({
    login: (idToken) => {},
    logout: () => {},
    isLoggedIn: false,
    idToken: ''
});

let logoutTimer;

const calulateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const expirationTimeSeconds = new Date(expirationTime).getTime();
    const remainingDuration = expirationTimeSeconds - currentTime;
    return remainingDuration;
}

const getStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    const remainingDuration = calulateRemainingTime(expirationTime);
    if(remainingDuration > 0) {
        return {
            token: storedToken,
            remainingDuration
        }
    } 
    return null;
}

export const AuthContextProvider = (props) =>{
    const tokenData = getStoredToken();
    let storedToken = '';
    if(tokenData) {
        storedToken = tokenData.token;
    }
    const [token, setToken] = useState(storedToken);
    const userLoggedIn = !!token;
    const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        logoutTimer && clearTimeout(logoutTimer);
    }

    const loginHandler = (token, expirationTime) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        const remainingDuration = calulateRemainingTime(expirationTime);
        console.log(remainingDuration);
        logoutTimer = setTimeout(logoutHandler, remainingDuration);
        setToken(token);
    }

    useEffect(() => {
        if(tokenData) {
            console.log("token duration",tokenData.remainingDuration);
            setTimeout(logoutHandler, tokenData.remainingDuration);
        }
    }, [tokenData])

    const contextValue = {
        idToken: token,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;