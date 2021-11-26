import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Router from './routes';

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout();
    }, []);

    return (
        <div className="App">
            {loading ? (
                <div className="loading-container">
                    <HashLoader size={50} loading={loading} color={'#3fa3db'} />
                </div>
            ) : (
                <Router />
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
