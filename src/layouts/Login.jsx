import React from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import passwordValidator from "password-validator";
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

    if (errors.password?.type === "minLength") {
        errMsg.password = "Password must be a minimum of 6 characters.";
    }

    let schema = new passwordValidator();

    schema
        .has()
        .lowercase()
        .uppercase()
        .has()
        .digits(1)
        .has()
        .symbols(1)
        .is()
        .min(6)
        .has()
        .not()
        .spaces();

    if (watch("password") && !schema.validate(watch("password"))) {
        errMsg.password =
            "Password must contain a lowercase, uppercase, at least one digit and a symbol, and should not coontain space.";
    }

    const onSubmit = (data) => {
        const isError = Object.values(errMsg).every(
            (error) => error === null || error === ""
        );

        if (isError) {
            // submit the form data to backend for processing
            console.log(data);
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
