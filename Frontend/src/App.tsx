import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Router from "./routes";

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
    }, []);

    return (
        <div className="App">
            {loading ? (
                <div className="loading-container">
                    <HashLoader size={50} loading={loading} color={"#3fa3db"} />
                </div>
            ) : (
                <Router />
            )}
        </div>
    );
}

export default App;
