import { useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = data => {
        if (data == null) {
        sessionStorage.removeItem('token');
        }
        sessionStorage.setItem('token', JSON.stringify(data));
        setToken(data.token);
    };

    return {
        setToken: saveToken,
        token
    }
}