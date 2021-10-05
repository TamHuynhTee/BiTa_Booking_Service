import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import "./App.css";
import { Footer } from "./components/footer";
import Router from "./routes";
import { HomePage } from "./views/home";

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
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
