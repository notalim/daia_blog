// src/components/Feed.jsx
import React from "react";
import Post from "./Post";

function Feed({ posts }) {
    return (
        <div className="feed">
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    );
}

export default Feed;
