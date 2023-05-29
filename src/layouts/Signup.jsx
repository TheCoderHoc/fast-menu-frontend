import React from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import passwordValidator from "password-validator";
import Input from "../components/Input";

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    let errMsg = {
        fullName: "",
        email: "",
        password: "",
        confirmPass: "",
    };

    if (errors.fullName?.type === "required") {
        errMsg.fullName = "Please enter your full name above.";
    }

    if (errors.email?.type === "required") {
        errMsg.email = "Please enter your email address above.";
    }

    if (errors.password?.type === "required") {
        errMsg.password = "Please enter your password above.";
    }

    if (errors.confirmPass?.type === "required") {
        errMsg.confirmPass = "Please re-enter your password above.";
    }

    if (watch("email") && !isEmail(watch("email"))) {
        errMsg.email = "Please enter a valid email address.";
    }

    if (errors.password?.type === "minLength") {
        errMsg.password = "Password must be a minimum of 6 characters.";
    }

    if (errors.confirmPass?.type === "minLength") {
        errMsg.confirmPass = "Password must be a minimum of 6 characters.";
    }

    if (watch("password") !== watch("confirmPass")) {
        errMsg.password = "Both Passwords must match.";
        errMsg.confirmPass = "Both passwords must match.";
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
            <h2 className="auth-title-text">Create an account</h2>

            <form
                className="auth-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    register={register("fullName", {
                        required: true,
                    })}
                    error={errMsg.fullName}
                />

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

                <Input
                    id="confirmPass"
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                    register={register("confirmPass", {
                        required: true,
                        minLength: 6,
                    })}
                    error={errMsg.confirmPass}
                />

                <Button
                    block
                    size="large"
                    className="btn btn-dark"
                    htmlType="submit"
                >
                    Sign Up
                </Button>
            </form>
        </>
    );
};

export default Signup;
