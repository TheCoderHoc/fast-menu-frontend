import React, { useEffect } from "react";
import { Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { login, setMessage } from "../../redux/auth.slice";

const Login = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate("/dashboard/home");
        }
    }, [auth.user]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(setMessage(""));
        }, 3000);
    }, [auth.message]);

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
            dispatch(login(data));
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
                <FormInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    register={register("email", { required: true })}
                    error={errMsg.email}
                />

                <FormInput
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
                    {auth.loading ? <Spin size="small" /> : "Login"}
                </Button>
            </form>
        </>
    );
};

export default Login;
