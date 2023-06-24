import React, { useEffect } from "react";
import "./styles.css";
import useAltSidebar from "../../hooks/useAltSidebar";

const Messages = () => {
    const [openAltSidebar, closeAltSidebar] = useAltSidebar();

    useEffect(() => {
        closeAltSidebar();
    }, []);

    return (
        <div className="messages">
            <h1 className="page-main-title">Coming Soon...</h1>
        </div>
    );
};

export default Messages;
