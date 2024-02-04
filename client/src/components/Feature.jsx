import React from "react";
import "./styles/Feature.css";

function Feature({ title, description, icon }) {
    return (
        <div className="feature">
            <img src={icon} alt={`${title} icon`} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Feature;