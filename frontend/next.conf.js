require('dotenv').config();

module.exports = {
    env: {
        REACT_APP_MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY,
        REACT_APP_END_POINT: process.env.REACT_APP_END_POINT,
    }
}