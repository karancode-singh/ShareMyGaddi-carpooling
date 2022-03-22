import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useToken(setActiveTrip) {
    const getToken = () => {
        const userToken = Cookies.get('tokken');
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = data => {
        if (data === null) {
            Cookies.remove('tokken');
            setActiveTrip(null);
        }
        else {
            Cookies.set('tokken', data);
            setToken(data.token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}