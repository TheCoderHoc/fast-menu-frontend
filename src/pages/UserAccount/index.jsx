import React, { useState, useEffect } from "react";
import "./styles.css";
import { Avatar, Button, Modal, Upload, message, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineEdit, AiOutlineUpload } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import FormInput from "../../components/FormInput";
import {
    setUser,
    updateUserInfo,
    logout,
    setMessage,
    setIsUserUpdated,
} from "../../redux/auth.slice";
import useFetchImage from "../../hooks/useFetchImage";
import useAltSidebar from "../../hooks/useAltSidebar";
import { API_URL } from "../../constants/api";

const UserAccount = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const dispatch = useDispatch();

    const showModal = (content) => {
        setModalContent(content);

        setModalOpen(true);
    };

    const hideModal = () => {
        setModalOpen(false);
    };

    const auth = useSelector((state) => state.auth);

    const handleLogOut = () => {
        dispatch(logout(auth.user_id));
    };

    const [loading, error, imageSrc] = useFetchImage(
        `${API_URL}/user/${auth.user._id}/avatar`,
        auth.user
    );

    const [openAltSidebar, closeAltSidebar] = useAltSidebar();

    useEffect(() => {
        closeAltSidebar();
    }, []);

    return (
        <>
            <div className="user-account">
                <h1 className="page-main-title">Your Profile</h1>

                <section className="user-account-basic-info user-account-section">
                    <Avatar size="large" alt="Dave Wilson" src={imageSrc} />

                    <div className="user-account-basic-info-details">
                        <h2>{auth.user.fullName}</h2>
                        <Button
                            type="default"
                            icon={<FiLogOut />}
                            style={{ marginTop: "1rem" }}
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Button>
                    </div>

                    <Button
                        type="default"
                        icon={<AiOutlineEdit />}
                        onClick={() => showModal("upload-avatar")}
                    >
                        Edit
                    </Button>
                </section>

                <section className="user-account-personal-information user-account-section">
                    <div className="user-account-section-header">
                        <h2 className="user-account-section-title">
                            Personal Information
                        </h2>

                        <Button
                            type="default"
                            icon={<AiOutlineEdit />}
                            onClick={() => showModal("personal")}
                        >
                            Edit
                        </Button>
                    </div>

                    <div className="user-account-section-content">
                        <div className="user-account-section-info">
                            <h3>First Name</h3>
                            <p>{auth.user.fullName.split(" ")[0]}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>Last Name</h3>
                            <p>{auth.user.fullName.split(" ")[1]}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>Email Address</h3>
                            <p>{auth.user.email}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>Phone</h3>
                            <p>{auth.user?.phone || "N/A"}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>Subscription</h3>
                            <p>{auth.user.subscriptionPlan}</p>
                        </div>
                    </div>
                </section>

                <section className="user-account-address-information user-account-section">
                    <div className="user-account-section-header">
                        <h2 className="user-account-section-title">Address</h2>
                        <Button
                            type="default"
                            icon={<AiOutlineEdit />}
                            onClick={() => showModal("address")}
                        >
                            Edit
                        </Button>
                    </div>

                    <div className="user-account-section-content" id="address">
                        <div className="user-account-section-info">
                            <h3>Country</h3>
                            <p>{auth.user?.address?.country || "N/A"}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>State</h3>
                            <p>{auth.user?.address?.state || "N/A"}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>City</h3>
                            <p>{auth.user?.address?.city || "N/A"}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>Postal Code</h3>
                            <p>{auth.user?.address?.postalCode || "N/A"}</p>
                        </div>

                        <div className="user-account-section-info">
                            <h3>Street</h3>
                            <p>{auth.user?.address?.street || "N/A"}</p>
                        </div>
                    </div>
                </section>
            </div>

            <Modal
                open={isModalOpen}
                footer={false}
                closable={true}
                onCancel={hideModal}
                title={
                    modalContent === "personal"
                        ? "Change Personal Information"
                        : modalContent === "address"
                        ? "Change Address Information"
                        : "Add a Profile Picture"
                }
            >
                {modalContent === "personal" ? (
                    <PersonalInfo auth={auth} onHideModal={hideModal} />
                ) : modalContent === "address" ? (
                    <AddressInfo auth={auth} onHideModal={hideModal} />
                ) : (
                    <UploadAvatarContent onHideModal={hideModal} />
                )}
            </Modal>
        </>
    );
};

const PersonalInfo = ({ auth, onHideModal }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    let errMessage = {
        fullName: "",
        email: "",
        phone: "",
    };

    if (errors.fullName?.type === "required") {
        errMessage.fullName = "Please enter your full name above.";
    }

    if (errors.email?.type === "required") {
        errMessage.email = "Please enter an email address above.";
    }

    if (watch("email") && !isEmail(watch("email"))) {
        errMessage.email = "Please enter a valid email address.";
    }

    const onSubmit = (data) => {
        const updatedUser = { ...auth.user, ...data };

        const isError = Object.values(errMessage).every(
            (error) => error === null || error === ""
        );

        if (isError) {
            dispatch(updateUserInfo(updatedUser));
        }
    };

    useEffect(() => {
        dispatch(setIsUserUpdated());

        if (auth.isUserUpdated) {
            setTimeout(() => {
                // CLEAR THE AUTH MESSAGE
                dispatch(setMessage(""));

                // CLOSE THE UPDATE PERSONAL INFO MODAL
                onHideModal();
            }, 3000);
        }
    }, [auth.isUserUpdated]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="modal-content-form">
            {auth.message && (
                <p className="modal-content-message">{auth.message}</p>
            )}

            <FormInput
                type="text"
                label="Full Name"
                placeholder="Please enter your full name."
                name="fullName"
                id="fullName"
                error={errMessage.fullName}
                register={register("fullName", {
                    value: auth.user?.fullName,
                    required: true,
                })}
            />

            <FormInput
                type="email"
                label="Email Address"
                placeholder="Please enter your email address."
                name="email"
                id="email"
                error={errMessage.email}
                register={register("email", {
                    value: auth.user?.email,
                    required: true,
                })}
            />

            <FormInput
                type="text"
                label="Phone"
                placeholder="Please enter your phone number."
                name="phone"
                id="phone"
                register={register("phone", {
                    value: auth.user?.phone,
                })}
            />

            <Button
                className="btn btn-dark"
                size="large"
                block
                htmlType="submit"
            >
                {auth.loading ? <Spin size="default" /> : "Submit"}
            </Button>
        </form>
    );
};

const AddressInfo = ({ auth, onHideModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    let errMessage = {
        country: "",
        state: "",
        city: "",
        postalCode: "",
        street: "",
    };

    if (errors.country?.type === "required") {
        errMessage.country = "Please enter your country above.";
    }

    if (errors.state?.type === "required") {
        errMessage.state = "Please enter your state above.";
    }

    if (errors.city?.type === "required") {
        errMessage.city = "Please enter your city above.";
    }

    if (errors.postalCode?.type === "required") {
        errMessage.postalCode = "Please enter your postal code above.";
    }

    if (errors.street?.type === "required") {
        errMessage.street = "Please enter your street above.";
    }

    const onSubmit = ({ country, state, city, postalCode, street }) => {
        const updatedUser = {
            ...auth.user,
            address: {
                country,
                state,
                city,
                postalCode,
                street,
            },
        };

        const isError = Object.values(errMessage).every(
            (error) => error === null || error === ""
        );

        if (isError) {
            dispatch(updateUserInfo(updatedUser));
        }
    };

    useEffect(() => {
        dispatch(setIsUserUpdated());

        if (auth.isUserUpdated) {
            setTimeout(() => {
                // CLEAR THE AUTH MESSAGE
                dispatch(setMessage(""));

                // CLOSE THE UPDATE PERSONAL INFO MODAL
                onHideModal();
            }, 3000);
        }
    }, [auth.isUserUpdated]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {auth.message && (
                <p className="modal-content-message">{auth.message}</p>
            )}

            <FormInput
                type="text"
                label="Country"
                placeholder="Please enter your country of origin."
                name="country"
                id="country"
                error={errMessage.country}
                register={register("country", {
                    value: auth.user?.address?.country,
                    required: true,
                })}
            />

            <FormInput
                type="text"
                label="State"
                placeholder="Please enter your state of residence."
                name="state"
                id="state"
                error={errMessage.state}
                register={register("state", {
                    value: auth.user?.address?.state,
                    required: true,
                })}
            />

            <FormInput
                type="text"
                label="City"
                placeholder="Please enter your city of residence."
                name="city"
                id="city"
                error={errMessage.city}
                register={register("city", {
                    value: auth.user?.address?.city,
                    required: true,
                })}
            />

            <FormInput
                type="text"
                label="Postal Code"
                placeholder="Please enter your postal code."
                name="postalCode"
                id="postalCode"
                error={errMessage.postalCode}
                register={register("postalCode", {
                    value: auth.user?.address?.postalCode,
                    required: true,
                })}
            />

            <FormInput
                type="text"
                label="Street"
                placeholder="Please enter your residential street."
                name="street"
                id="street"
                error={errMessage.street}
                register={register("street", {
                    value: auth.user?.address?.street,
                    required: true,
                })}
            />

            <Button
                className="btn btn-dark"
                size="large"
                block
                htmlType="submit"
            >
                {auth.loading ? <Spin size="default" /> : "Submit"}
            </Button>
        </form>
    );
};

const beforeUpload = (file) => {
    // FILE SHOULD BE LESS THAN 2MB
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error("Image size must be less than 2MB");
    }

    return isLt2M;
};

const UploadAvatarContent = ({ onHideModal }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const dispatch = useDispatch();

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }

        if (info.file.status === "done") {
            dispatch(setUser({ user: info.file.response.user }));

            onHideModal();

            return;
        }

        if (info.file.status === "error") {
            setLoading(false);
            return;
        }
    };

    const uploadProps = {
        name: "avatar",
        listType: "picture-circle",
        className: "upload-avatar",
        action: `${API_URL}/user/avatar`,
        maxCount: 1,
        showUploadList: false,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        accept: "image/png, image/jpg, image/jpeg",
    };

    const uploadButton = (
        <div className="upload-button">
            <AiOutlineUpload size={20} />
            Upload
        </div>
    );

    return (
        <div className="upload-avatar">
            <Upload
                {...uploadProps}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {uploadButton}
            </Upload>
        </div>
    );
};

export default UserAccount;
