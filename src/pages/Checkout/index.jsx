import React, { useState, useEffect } from "react";
import "./styles.css";
import { Divider, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { isEmail } from "validator";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { fetchCart } from "../../redux/cartSlice";
import checkoutSuccessImage from "../../assets/images/checkout-success.gif";
import { emptyCart } from "../../redux/cartSlice";

const Checkout = () => {
    const [isSubmit, setSubmit] = useState(false);

    const { totalPrice, totalQuantity, products } = useSelector(
        (state) => state.cart.cart
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    let errMsg = {
        email: "",
        card: "",
        expiryDate: "",
        cvv: "",
    };

    // EMAIL ADDRESS IS REQUIRED
    if (errors.email?.type === "required") {
        errMsg.email = "Please enter your email address above.";
    }

    // EMAIL MUST BE IN A VALID FORMAT
    if (watch("email") && !isEmail(watch("email"))) {
        errMsg.email = "Please enter a valid email address.";
    }

    // CREDIT CARD IS REQUIRED
    if (errors.card?.type === "required") {
        errMsg.card = "Please enter a credit card number.";
    }

    // CREDIT CARD MUST BE 16 CHARACTERS
    if (
        errors.card?.type === "minLength" ||
        errors.card?.type === "maxLength"
    ) {
        errMsg.card = "Please enter a valid credit card number.";
    }

    // EXPIRY DATE IS REQUIRED
    if (errors.expiryDate?.type === "required") {
        errMsg.expiryDate = "Please enter your card expiry date.";
    }

    //  CVV NUMBER IS REQUIRED
    if (errors.cvv?.type === "required") {
        errMsg.cvv = "Please enter your card cvv number.";
    }

    // CVV MUST BE 3 CHARACTERS
    if (errors.cvv?.type === "minLength" || errors.cvv?.type === "maxLength") {
        errMsg.cvv = "Please enter a valid cvv number.";
    }

    const onSubmit = (data) => {
        const isError = Object.values(errMsg).every(
            (error) => error === null || error === ""
        );

        if (isError) {
            setSubmit(true);

            // CLEAR THE USER CART
            dispatch(emptyCart());

            // REDIRECT THE USER BACK TO THE PREVIOUS PAGE
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
    };

    if (isSubmit) {
        return (
            <div className="checkout-success">
                <img src={checkoutSuccessImage} width={500} />;
            </div>
        );
    }

    return (
        <div className="checkout">
            <h2 className="checkout-title">Payment Details</h2>

            <form
                className="checkout-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <FormInput
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="user@example.com"
                    register={register("email", {
                        required: true,
                    })}
                    error={errMsg.email}
                />

                <FormInput
                    id="card"
                    name="card"
                    label="Credit Card Number"
                    type="text"
                    placeholder="**** **** **** ****"
                    register={register("card", {
                        required: true,
                        minLength: 16,
                        maxLength: 16,
                    })}
                    error={errMsg.card}
                />

                <FormInput
                    id="expiryDate"
                    name="expiryDate"
                    label="Expiry Date"
                    placeholder="mm / yy"
                    type="text"
                    register={register("expiryDate", {
                        required: true,
                    })}
                    error={errMsg.expiryDate}
                />

                <FormInput
                    id="cvv"
                    name="cvv"
                    label="CVV"
                    type="text"
                    placeholder="***"
                    register={register("cvv", {
                        required: true,
                        minLength: 3,
                        maxLength: 3,
                    })}
                    error={errMsg.cvv}
                />

                <div className="checkout-details">
                    <div className="checkout-total-quantity">
                        <h3>Total Quantity</h3>
                        <p>{totalQuantity}</p>
                    </div>

                    <div className="checkout-subtotal">
                        <h3>Subtotal</h3>
                        <p>${totalPrice}</p>
                    </div>

                    <div className="checkout-fee">
                        <h3>Platform Fee</h3>
                        <p>$3</p>
                    </div>

                    <Divider />

                    <div className="checkout-total">
                        <h3>Total Amount</h3>
                        <p>${totalPrice + 3}</p>
                    </div>
                </div>

                <Button
                    size="large"
                    className="btn btn-dark"
                    block
                    htmlType="submit"
                >
                    Pay ${totalPrice + 3}
                </Button>
            </form>
        </div>
    );
};

export default Checkout;
