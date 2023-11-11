// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Feed from "./components/Hero";

function App() {
    const isLoggedIn = false;
    const posts = []; 

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn} />
            <Feed posts={posts} />
        </div>
    );
}

export default App;
