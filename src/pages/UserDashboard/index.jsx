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
    const [mainSidebarOpen, setMainSidebarOpen] = useState(false);
    const [altSidebarOpen, setAltSidebarOpen] = useState(true);

    const showMainSidebar = () => {
        setMainSidebarOpen(true);
    };

    const hideMainSidebar = () => {
        setMainSidebarOpen(false);
    };

    const showAltSidebar = () => {
        setAltSidebarOpen(true);
    };

    const hideAltSidebar = () => {
        setAltSidebarOpen(false);
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
                        onClick={showMainSidebar}
                    />
                </div>
            ) : (
                <MainSidebar />
            )}

            <main className="user-dashboard-content">
                <Outlet />
            </main>

            {/* MAIN SIDEBAR FROM THE LEFT */}
            <div className="main-sidebar-drawer">
                <Drawer
                    placement="left"
                    open={mainSidebarOpen}
                    onClose={hideMainSidebar}
                    closable={isMatch}
                    size="default"
                    width={250}
                >
                    <MainSidebar onHideDrawer={hideMainSidebar} />
                </Drawer>
            </div>

            {/* ALTERNATIVE SIDEBAR FROM THE RIGHT */}
            <div className="alt-sidebar-drawer"></div>
            <Drawer
                placement="right"
                open={altSidebarOpen}
                onClose={hideAltSidebar}
                size="default"
                className="alt-sidebar-drawer"
                closable={false}
            >
                <AltSidebar />
            </Drawer>
        </div>
    );
};

export default UserDashboard;
