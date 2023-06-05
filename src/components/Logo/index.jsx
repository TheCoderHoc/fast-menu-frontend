import React from "react";
import "./styles.css";

const Logo = ({ type }) => {
    return (
        <h1
            className={`logo ${
                type === "primary" ? "logo-primary" : "logo-default"
            }`}
        >
            Fast <span>Menu</span>
        </h1>
    );
};

export default Logo;
