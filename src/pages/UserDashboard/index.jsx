import React, { useState } from "react";
import "./styles.css";
import { Outlet } from "react-router-dom";
import MainSidebar from "../../layouts/MainSidebar";
import AltSidebar from "../../layouts/AltSidebar";
import useMediaQuery from "../../hooks/useMediaQuery";
import { AiOutlineBars } from "react-icons/ai";
import { Button, Drawer } from "antd";

const UserDashboard = () => {
    const isMatch = useMediaQuery("(max-width: 768px)");
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const hideDrawer = () => {
        setOpen(false);
    };

    return (
        <div className="user-dashboard">
            {isMatch ? (
                <div className="main-sidebar-menu-bar">
                    <Button
                        size="large"
                        icon={<AiOutlineBars size={25} color="#fff" />}
                        className="btn btn-primary btn-icon"
                        block
                        onClick={showDrawer}
                    />
                </div>
            ) : (
                <MainSidebar />
            )}

            <main className="user-dashboard-content">
                <Outlet />
            </main>

            {/* <AltSidebar /> */}

            <Drawer
                placement="left"
                open={open}
                onClose={hideDrawer}
                closable={isMatch}
                size="default"
                className="main-sidebar-drawer"
            >
                <MainSidebar onHideDrawer={hideDrawer} />
            </Drawer>
        </div>
    );
};

export default UserDashboard;
