import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo";
import navLinks from "../../data/navLinks";

const MainSidebar = ({ onHideDrawer }) => {
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
        </aside>
    );
};

export default MainSidebar;
