import React from "react";
import "./styles.css";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const SectionHeader = ({ title, ctaLabel, ctaLink }) => {
    return (
        <header className="section-header">
            <h2 className="section-header-title">{title}</h2>

            <p className="section-header-cta">
                <Link to={ctaLink}>
                    {ctaLabel}
                    <BiChevronRight size={23} color="var(--primary-color)" />
                </Link>
            </p>
        </header>
    );
};

export default SectionHeader;
