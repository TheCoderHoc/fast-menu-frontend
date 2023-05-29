import React from "react";
import "./styles.css";
import { Button, Divider, Tabs } from "antd";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import Logo from "../../components/Logo";
import Signup from "../../layouts/Signup";
import Login from "../../layouts/Login";

const Auth = () => {
    const tabs = [
        {
            key: "1",
            label: "Sign Up",
            children: <Signup />,
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
                </div>
            </header>

            <main className="auth-content">
                <Tabs
                    defaultActiveKey="1"
                    items={tabs}
                    centered
                    size="middle"
                    tabBarGutter={100}
                    destroyInactiveTabPane
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
