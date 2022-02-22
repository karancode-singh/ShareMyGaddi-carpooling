import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useToken() {
    const getToken = () => {
        const userToken = Cookies.get('tokken');
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = data => {
        if (data === null) {
            Cookies.remove('tokken');
        }
        else{
            console.log("Token:"+data)
            Cookies.set('tokken', JSON.stringify(data));
            setToken(data.token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}