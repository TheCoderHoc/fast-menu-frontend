import React from "react";
import "./styles.css";

const FormInput = ({ id, name, label, type, placeholder, register, error }) => {
    return (
        <div className="form-input">
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
                <div className="form-input-error">
                    <p className="form-input-error-text">{error}</p>
                </div>
            )}
        </div>
    );
};

export default FormInput;
