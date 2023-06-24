import React, { useState } from "react";
import "./styles.css";
import { Button, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import MainSidebar from "../../layouts/MainSidebar";
import AltSidebar from "../../layouts/AltSidebar";
import useMediaQuery from "../../hooks/useMediaQuery";
import { closeDrawer } from "../../redux/UI.slice";

const Dashboard = () => {
    const isMatch = useMediaQuery("(max-width: 768px)");
    const [mainSidebarOpen, setMainSidebarOpen] = useState(false);

    const { isDrawerOpen } = useSelector((state) => state.UI);

    const dispatch = useDispatch();

    const showMainSidebar = () => {
        setMainSidebarOpen(true);
    };

    const hideMainSidebar = () => {
        setMainSidebarOpen(false);
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
                <MainSidebar onHideMainSidebar={hideMainSidebar} />
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
                    <MainSidebar onHideMainSidebar={hideMainSidebar} />
                </Drawer>
            </div>

            {/* ALTERNATIVE SIDEBAR FROM THE RIGHT */}
            <Drawer
                placement="right"
                open={isDrawerOpen}
                onClose={() => dispatch(closeDrawer())}
                size="default"
                className="alt-sidebar-drawer"
                closable={false}
            >
                <AltSidebar />
            </Drawer>
        </div>
    );
};

export default Dashboard;
