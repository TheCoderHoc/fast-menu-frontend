import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Divider, Tabs } from "antd";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import Logo from "../../components/Logo";
import Signup from "../../layouts/Signup";
import Login from "../../layouts/Login";

const Auth = () => {
    const [message, setMessage] = useState("");
    const [activeKey, setActiveKey] = useState("1");

    const onChange = (key) => {
        setActiveKey(key);
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }, [message]);

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
                    <Logo />

                    {message && (
                        <p className="text-white auth-header-message">
                            {message}
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
