import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useToken() {
    const getToken = () => {
        const userToken = Cookies.get('token');
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = data => {
        if (data === null) {
            Cookies.remove('token');
        }
        else {
            Cookies.set('token', data);
            setToken(data.token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}