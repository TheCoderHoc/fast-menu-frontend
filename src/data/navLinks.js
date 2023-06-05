import { AiOutlineMessage } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { BiFoodMenu } from "react-icons/bi";
import {
    MdFavoriteBorder,
    MdOutlineNotificationsNone,
    MdManageAccounts,
    MdOutlineHistory,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

const navLinks = [
    {
        id: 0,
        label: "Dashboard",
        Icon: RxDashboard,
        path: "/user/dashboard/home",
    },
    {
        id: 1,
        label: "Food Menu",
        Icon: BiFoodMenu,
        path: "/user/dashboard/menu",
    },
    {
        id: 2,
        label: "Favourites",
        Icon: MdFavoriteBorder,
        path: "/user/dashboard/favourites",
    },
    {
        id: 3,
        label: "Order History",
        Icon: MdOutlineHistory,
        path: "/user/dashboard/order-history",
    },
    {
        id: 4,
        label: "Messages",
        Icon: AiOutlineMessage,
        path: "/user/dashboard/messages",
    },
    {
        id: 5,
        label: "Community",
        Icon: HiUserGroup,
        path: "/user/dashboard/community",
    },
    {
        id: 6,
        label: "Notifications",
        Icon: MdOutlineNotificationsNone,
        path: "/user/dashboard/notifications",
    },
    {
        id: 7,
        label: "Account",
        Icon: MdManageAccounts,
        path: "/user/dashboard/account",
    },
];

export default navLinks;
