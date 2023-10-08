// src/components/Post.jsx
import React from "react";

function Post({ title, creator, date, content }) {
    return (
        <div className="post-card">
            <h2>{title}</h2>
            <p>
                By {creator} on {date}
            </p>
            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            {/* Like and comment buttons will go here */}
        </div>
    );
}

export default Post;
