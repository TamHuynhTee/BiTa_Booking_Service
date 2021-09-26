import React, { useState } from 'react';
import './App.css';
import { Footer } from './components/footer';
import Router from './routes';
import { HomePage } from './views/home';

function App() {
    return (
        <div className="App">
            <Router />
        </div>
    );
}

export default App;
