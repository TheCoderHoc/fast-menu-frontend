import React from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import Input from "../components/Input";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    let errMsg = {
        email: "",
        password: "",
    };

    if (errors.email?.type === "required") {
        errMsg.email = "Please enter your email address above.";
    }

    if (watch("email") && !isEmail(watch("email"))) {
        errMsg.email = "Please enter a valid email address.";
    }

    if (errors.password?.type === "required") {
        errMsg.password = "Please enter your password above.";
    }

    const onSubmit = (data) => {
        const isError = Object.values(errMsg).every(
            (error) => error === null || error === ""
        );

        if (isError) {
            // submit the form data to backend for processing
            // redirect the user to the dashboard page
        }
    };

    return (
        <>
            <h2 className="auth-title-text">Login your account</h2>

            <form
                className="auth-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    register={register("email", { required: true })}
                    error={errMsg.email}
                />

                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    register={register("password", {
                        required: true,
                        minLength: 6,
                    })}
                    error={errMsg.password}
                />

                <Button
                    block
                    size="large"
                    className="btn btn-dark"
                    htmlType="submit"
                >
                    Login
                </Button>
            </form>
        </>
    );
};

export default Login;
