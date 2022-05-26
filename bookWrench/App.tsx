import React from 'react';
import routes from '@routes';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
    return <Router>{routes()}</Router>;
}
