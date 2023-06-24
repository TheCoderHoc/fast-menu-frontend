import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { BsCart4 } from "react-icons/bs";
import Logo from "../../components/Logo";
import navLinks from "../../data/navLinks";
import useAltSidebar from "../../hooks/useAltSidebar";
import useMediaQuery from "../../hooks/useMediaQuery";

const MainSidebar = ({ onHideMainSidebar }) => {
    const [openAltSidebar, closeAltSidebar] = useAltSidebar();

    const isMatch = useMediaQuery("(max-width: 768px)");

    const handleClick = () => {
        openAltSidebar();

        if (isMatch) {
            onHideMainSidebar();
        }
    };

    return (
        <aside className="main-sidebar">
            <div className="main-sidebar-top">
                <Logo />

                <nav className="main-sidebar-nav">
                    <ul>
                        {navLinks.map(({ id, path, Icon, label }) => (
                            <li key={id} onClick={onHideMainSidebar}>
                                <NavLink to={path} end>
                                    <Icon size={20} />
                                    <span>{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <Button
                type="default"
                className="btn btn-primary-alt"
                block
                icon={<BsCart4 />}
                onClick={handleClick}
            >
                View Cart
            </Button>
        </aside>
    );
};

export default MainSidebar;
