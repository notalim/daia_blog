// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
    const isLoggedIn = false; // This will be dynamic later
    const posts = []; // This will come from your database later

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn} />
            <Feed posts={posts} />
        </div>
    );
}

export default App;
