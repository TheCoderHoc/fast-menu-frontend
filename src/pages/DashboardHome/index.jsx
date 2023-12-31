import React, { useState, useEffect } from "react";
import "./styles.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigation, Pagination } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import menuCategories from "../../data/menuCategories";
import SectionHeader from "../../layouts/SectionHeader";
import chefImage from "../../assets/images/chef.png";
import MealItem from "../../layouts/MealItem";
import { fetchPopularProducts } from "../../redux/product.slice";
import { fetchFavourites } from "../../redux/favourite.slice";

const DashboardHome = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const auth = useSelector((state) => state.auth);
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPopularProducts());

        dispatch(fetchFavourites());
    }, []);

    // EXTRACT FIRST NAME FROM USER'S FULL NAME
    const name = auth.user.fullName.split(" ")[0];

    const handleSubmit = (e) => {
        // PREVENT FORM SUBMISSION
        e.preventDefault();

        navigate(`/dashboard/menu?search=${searchQuery}`);
    };

    const handleCategoryClick = (categoryName) => {
        const category = categoryName.toLowerCase();

        navigate(`/dashboard/menu?category=${category}`);
    };

    return (
        <div className="user-dashboard-home">
            <header className="user-dashboard-home-header">
                <h1 className="page-main-title">Welcome, {name}</h1>

                <form
                    className="user-dashboard-home-form"
                    onSubmit={handleSubmit}
                >
                    <AiOutlineSearch size={22} color="var(--primary-color)" />
                    <input
                        type="text"
                        placeholder="What do you want to eat today?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </header>

            <section className="user-dashboard-home-banner">
                <h2 className="user-dashboard-home-banner-title">
                    Get Discount Voucher <br /> Up To 20%
                </h2>

                <p className="user-dashboard-home-banner-description">
                    Get free delivery for every $20 purchase <span></span> you
                    make on Fast Menu.
                </p>

                <img
                    src={chefImage}
                    alt="Picture of a chef smiling"
                    className="user-dashboard-home-banner-image"
                />
                <Button size="large" className="btn btn-default">
                    Learn More
                </Button>
            </section>

            <section className="user-dashboard-home-categories">
                <SectionHeader title="Categories" ctaLabel="View all" />

                <Swiper
                    spaceBetween={10}
                    slidesPerView={6}
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        470: { slidesPerView: 3 },
                        768: { slidesPerView: 3 },
                        968: { slidesPerView: 6 },
                    }}
                >
                    {menuCategories.map(({ id, icon, label }) => (
                        <SwiperSlide
                            key={id}
                            onClick={() => handleCategoryClick(label)}
                        >
                            <div className="user-dashboard-home-category">
                                <img src={icon} alt={label} />
                                <h3>{label}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <section className="user-dashboard-home-popular-dishes">
                <SectionHeader
                    title="Popular Dishes"
                    ctaLabel="View all"
                    ctaLink="/dashboard/menu?filter=popular"
                />
                <ul className="user-dashboard-home-popular-dishes-list">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            550: { slidesPerView: 2 },
                            769: { slidesPerView: 1 },
                            968: { slidesPerView: 2 },
                            1050: { slidesPerView: 3 },
                        }}
                    >
                        {product.products.map((product) => (
                            <SwiperSlide key={product._id}>
                                <MealItem product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ul>
            </section>

            <section className="user-dashboard-home-recent-orders">
                <SectionHeader
                    title="Recent Orders"
                    ctaLabel="View all"
                    ctaLink="/dashboard/order-history"
                />

                <p className="user-dashboard-home-recent-orders-empty-text">
                    You do not have any recent orders. Place an order on a
                    delicious meal and check back later.
                </p>
            </section>
        </div>
    );
};

export default DashboardHome;
