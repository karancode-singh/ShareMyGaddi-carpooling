import { useState } from 'react';
import Cookies from 'js-cookie';

export default function useActiveTrip() {
    const getActiveTrip = () => {
        const activeTrip = Cookies.get('activeTrip');
        return activeTrip;
    };

    const [activeTrip, setActiveTrip] = useState(getActiveTrip());

    const saveActiveTrip = data => {
        if (data === null) {
            Cookies.remove('activeTrip');
        }
        else {
            Cookies.set('activeTrip', data);
            setActiveTrip(data.activeTrip);
        }
    };

    return {
        setActiveTrip: saveActiveTrip,
        activeTrip
    }
}