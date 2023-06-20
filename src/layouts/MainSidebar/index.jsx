import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import Logo from "../../components/Logo";
import navLinks from "../../data/navLinks";
import { openDrawer } from "../../redux/UISlice";

const MainSidebar = ({ onHideDrawer }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(openDrawer());
    };

    return (
        <aside className="main-sidebar">
            <Logo />

            <nav className="main-sidebar-nav">
                <ul>
                    {navLinks.map(({ id, path, Icon, label }) => (
                        <li key={id} onClick={onHideDrawer}>
                            <NavLink to={path} end>
                                <Icon size={20} />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <Button
                type="default"
                className="btn btn-primary-alt"
                block
                onClick={handleClick}
            >
                Show Order Menu
            </Button>
        </aside>
    );
};

export default MainSidebar;
