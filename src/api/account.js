import React, { useState, useEffect, useContext } from "react";
import sha512 from "crypto-js/sha512";

import Api from "./api";

const R_TOKEN_LS = "mididomotica_data1";
const A_TOKEN_LS = "mididomotica_data2";

const AccountContext = React.createContext({});

export function Authorize({ children }) {

    const API = new Api();

    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (!API)
        {
            console.log("Api undefined!");
            return;
        }

        async function checkLogin() {

            const toLogin = () => {
                window.location.href = '/signin/login';
                setLoaded(true);
            };

            if (window.location.pathname == '/signin/login') {
                setLoaded(true);
                return;
            }

            var localAccessToken = localStorage.getItem(A_TOKEN_LS);
            var localRefreshToken = localStorage.getItem(R_TOKEN_LS);
            
            if (!accessToken || accessToken.length !== 45 || !refreshToken || refreshToken.length !== 58) {
                if (localAccessToken && localAccessToken.length === 45) {
                    setAccessToken(localAccessToken);
                }
                else
                {
                    toLogin();
                }

                if (localRefreshToken && localRefreshToken.length === 58) {
                    setRefreshToken(localRefreshToken);
                }
                else
                {
                    toLogin()
                }

                setLoaded(true);
                return;

            } else {
                const tokenValidation = await API.ValidateAccessToken({ [API.AccessTokenHeaderName]: accessToken });

                if (tokenValidation.result == true) {
                    console.log("Token validated.");
                    setLoaded(true);
                    return;

                } else {
                    console.log("Token invalid. Refreshing...");

                    const newAuthInfo = await API.RefreshAccessToken({ [API.RefreshTokenName]: refreshToken });

                    if (newAuthInfo !== "Error" && newAuthInfo.success === true) {
                        console.log("New token received.");

                        setAccessToken(newAuthInfo.accessToken);
                        localStorage.setItem(A_TOKEN_LS, newAuthInfo.accessToken);

                        setLoaded(true);
                        return;
                    }
                    else {
                        localStorage.removeItem(A_TOKEN_LS);

                        setLoaded(true);
                        return;
                    }
                }
            };
        };

        checkLogin();
    }, []);

    const setData = (authInfo) => {
        setRefreshToken(authInfo.refreshToken);
        localStorage.setItem(R_TOKEN_LS, authInfo.refreshToken);

        setAccessToken(authInfo.accessToken);
        localStorage.setItem(A_TOKEN_LS, authInfo.accessToken);

        return { result: true };
    };

    const login = async (password, Api) => {
        var hashedPass = hash(password + 'FGF798DSF4SD');

        return await Api.Login(hashedPass).then((res) => {
            if (res && res.data &&
                (res.data instanceof Object || typeof res.data == 'object')
                && res.data.result == true)
            {
                setData(res.data);
            }

            return res;
        });
    };

    const refresh = async () => {
        const newAuthInfo = await API.RefreshAccessToken({ [API.RefreshTokenName]: refreshToken });

        if (newAuthInfo !== "Error" && newAuthInfo.success === true) {
            console.log("New token received.");

            setAccessToken(newAuthInfo.accessToken);
            localStorage.setItem(A_TOKEN_LS, newAuthInfo.accessToken);

            setLoaded(true);
            return;
        }
        else {
            localStorage.removeItem(A_TOKEN_LS);

            setLoaded(true);
        }
    };

    const logout = () => {
        API.Logout();

        localStorage.removeItem(A_TOKEN_LS);
        localStorage.removeItem(R_TOKEN_LS);

        setAccessToken(null);
        setRefreshToken(null);

        window.location.href = '/signin/login';
    };

    var contextValue = {
        loaded: loaded,
        authorized: refreshToken && accessToken ? true : false,
        login: login,
        logout: logout,
        requestRefresh: refresh,
    };

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    );
};

export function useAccount() {
    return useContext(AccountContext);
};

function hash(data) {
    return sha512(data).toString().toLocaleUpperCase();
};