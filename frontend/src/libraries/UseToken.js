import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useToken(setActiveTrip) {
    const [token, setToken] = useState(Cookies.get('tokken'));
    const [name, setName] = useState(Cookies.get('name'));

    const saveToken = data => {
        if (data === null) {
            Cookies.remove('tokken');
            Cookies.remove('name');
            setActiveTrip(null);
        }
        else {
            Cookies.set('tokken', data.token);
            Cookies.set('name', data.name);
            setToken(data.token);
            setName(data.name);
        }
    };

    return {
        setToken: saveToken,
        token,
        name
    }
}