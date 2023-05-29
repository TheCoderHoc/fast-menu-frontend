import React from "react";
import "./styles.css";

const Input = ({ id, name, label, type, placeholder, register, error }) => {
    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                autoComplete="true"
                id={id}
                {...register}
            />

            {error && (
                <div className="input-error">
                    <p className="input-error-text">{error}</p>
                </div>
            )}
        </div>
    );
};

export default Input;
