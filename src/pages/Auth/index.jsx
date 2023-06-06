import React, { useState, useEffect } from "react";
import "./styles.css";
import { Button, Divider, Tabs } from "antd";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { useSelector } from "react-redux";
import Logo from "../../components/Logo";
import Signup from "../../layouts/Auth/Signup";
import Login from "../../layouts/Auth/Login";
import { setMessage } from "../../redux/authSlice";

const Auth = () => {
    const auth = useSelector((state) => state.auth);
    const [activeKey, setActiveKey] = useState("1");

    const onChange = (key) => {
        setActiveKey(key);
    };

    const tabs = [
        {
            key: "1",
            label: "Sign Up",
            children: (
                <Signup
                    onChangeActiveTab={onChange}
                    onSetMessage={(message) => setMessage(message)}
                />
            ),
        },
        {
            key: "2",
            label: "Login",
            children: <Login />,
        },
    ];

    return (
        <div className="auth">
            <header className="auth-header">
                <div className="auth-header-container">
                    <Logo type="primary" />

                    {auth.message && (
                        <p className="text-white auth-header-message">
                            {auth.message}
                        </p>
                    )}

                    <div className="auth-invisible"></div>
                </div>
            </header>

            <main className="auth-content">
                <Tabs
                    defaultActiveKey={activeKey}
                    items={tabs}
                    centered
                    onChange={onChange}
                    size="middle"
                    tabBarGutter={100}
                    destroyInactiveTabPane
                    activeKey={activeKey}
                />

                <Divider>or</Divider>

                <Button
                    type="default"
                    block
                    size="large"
                    className="btn btn-default"
                    icon={<FcGoogle size={20} />}
                >
                    Continue with Google
                </Button>

                <Button
                    type="default"
                    block
                    size="large"
                    className="btn btn-default"
                    icon={<AiFillApple size={20} />}
                >
                    Continue with Apple
                </Button>

                <Button
                    type="default"
                    block
                    size="large"
                    className="btn btn-default"
                    icon={<AiFillFacebook size={20} color="#0165e1" />}
                >
                    Continue with Facebook
                </Button>
            </main>
        </div>
    );
};

export default Auth;
