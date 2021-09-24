import React, { useState } from 'react';
import './App.css';
import { Footer } from './components/footer';
import { HomePage } from './views/home';

function App() {
    return (
        <div className="App">
            <HomePage />
            <Footer />
        </div>
    );
}

export default App;
