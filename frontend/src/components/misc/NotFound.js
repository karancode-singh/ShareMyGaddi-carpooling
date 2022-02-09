import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                <br/><br/><br/><br/>
                <h1>404 - Not Found!</h1><br/>
                <Link to="/">Go Home</Link>
            </div>
        </>
    );
}