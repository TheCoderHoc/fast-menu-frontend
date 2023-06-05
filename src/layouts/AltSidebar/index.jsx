import React from "react";
import "./styles.css";
import { Badge, Avatar, Button, Divider } from "antd";
import { TiMessages } from "react-icons/ti";
import {
    MdOutlineNotificationsNone,
    MdAttachMoney,
    MdOutlineMoney,
} from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import userPic from "../../assets/images/user.jpg";
import menuOrder from "../../data/menuOrder";

const AltSidebar = () => {
    return (
        <aside className="alt-sidebar">
            <div className="alt-sidebar-top-content">
                <div className="alt-sidebar-top-content-left">
                    <Badge dot color="var(--primary-color)">
                        <TiMessages size={18} />
                    </Badge>
                    <Badge dot color="var(--primary-color)">
                        <MdOutlineNotificationsNone size={18} />
                    </Badge>
                    <AiFillSetting size={18} />
                </div>

                <div className="alt-sidebar-top-content-right">
                    <Avatar
                        size="large"
                        src={userPic}
                        alt="Profile picture of user"
                    />
                </div>
            </div>

            <div className="alt-sidebar-user-balance">
                <h2 className="alt-sidebar-user-balance-title">Your Balance</h2>

                <div className="alt-sidebar-user-balance-box">
                    <div className="alt-sidebar-user-balance-amount">
                        <h2>Balance</h2>
                        <h3>$12.00</h3>
                    </div>

                    <div className="alt-sidebar-user-balance-action">
                        <Button
                            size="small"
                            className="btn btn-white btn-icon"
                            icon={<MdAttachMoney size={18} />}
                        />
                        <p>Top Up</p>
                    </div>

                    <div className="alt-sidebar-user-balance-action">
                        <Button
                            size="small"
                            className="btn btn-white btn-icon"
                            icon={<MdOutlineMoney size={18} />}
                        />
                        <p>Transfer</p>
                    </div>
                </div>
            </div>

            <div className="alt-sidebar-user-address">
                <h2 className="alt-sidebar-user-address-title">
                    Your Billing Address
                </h2>

                <div className="alt-sidebar-user-address-name">
                    <p>12 Erelu Danisa Street, Ijeshatedo, Lagos</p>
                    <Button type="small" className="btn btn-primary-alt" block>
                        Change Address
                    </Button>
                </div>
            </div>

            <div className="alt-sidebar-order-menu">
                <h2 className="alt-sidebar-order-menu-title">
                    Your Order Menu
                </h2>

                {menuOrder.map(({ id, image, name, price, amount }) => (
                    <div className="alt-sidebar-menu-order-item" key={id}>
                        <div>
                            <img
                                src={image}
                                alt={name}
                                className="alt-sidebar-order-item-image"
                            />

                            <div className="alt-sidebar-menu-order-item-title">
                                <h3>{name}</h3>
                                <p className="alt-sidebar-menu-order-item-amount">
                                    x{amount}
                                </p>
                            </div>
                        </div>
                        <p className="text-bold">
                            +<span className="text-primary">$</span>
                            {price}
                        </p>
                    </div>
                ))}
            </div>

            <Divider style={{ borderColor: "var(--gray-color)" }} />

            <div className="alt-sidebar-total">
                <h3>Total:</h3>
                <p>
                    <span className="text-primary">$</span> 202
                </p>
            </div>

            <Button size="large" className="btn btn-primary" block>
                Checkout
            </Button>
        </aside>
    );
};

export default AltSidebar;
