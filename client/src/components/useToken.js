import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('Token');
        const userToken = JSON.parse(tokenString);

        return userToken?.Token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('Token', JSON.stringify(userToken));
        setToken(userToken.Token);
    };
    return {
        setToken: saveToken,
        token
    }
}