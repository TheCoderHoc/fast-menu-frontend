import { useDispatch } from "react-redux";
import { openDrawer, closeDrawer } from "../redux/UI.slice";

const useAltSidebar = () => {
    const dispatch = useDispatch();

    const openAltSidebar = () => {
        dispatch(openDrawer());
    };

    const closeAltSidebar = () => {
        dispatch(closeDrawer());
    };

    return [openAltSidebar, closeAltSidebar];
};

export default useAltSidebar;
