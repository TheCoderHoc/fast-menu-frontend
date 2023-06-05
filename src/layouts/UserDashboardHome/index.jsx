import React, { useState } from "react";
import "./styles.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "antd";
import { Navigation, Pagination } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import menuCategories from "../../data/menuCategories";
import SectionHeader from "../../components/SectionHeader";
import chefImage from "../../assets/images/chef.png";
import popularDishes from "../../data/popularDishes";
import PopularDishes from "../PopularDishes";

const UserDashboardHome = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    return (
        <div className="user-dashboard-home">
            <header className="user-dashboard-home-header">
                <h1 className="user-dashboard-home-header-title">
                    Welcome, Jennifer
                </h1>

                <form className="user-dashboard-home-form">
                    <AiOutlineSearch size={22} color="var(--primary-color)" />
                    <input
                        type="text"
                        placeholder="What do you want to eat today?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.query)}
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
                        325: { slidesPerView: 4 },
                        768: { slidesPerView: 5 },
                        968: { slidesPerView: 6 },
                    }}
                >
                    {menuCategories.map(({ id, icon, label }) => (
                        <SwiperSlide key={id}>
                            <div className="user-dashboard-home-category">
                                <img src={icon} alt={label} />
                                <h3>{label}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <section className="user-dashboard-home-popular-dishes">
                <SectionHeader title="Popular Dishes" ctaLabel="View all" />
                <ul className="user-dashboard-home-popular-dishes-list">
                    {/* {popularDishes.map((dish) => (
                        <PopularDishes key={dish.id} {...dish} />
                    ))} */}

                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            500: { slidesPerView: 2 },
                            968: { slidesPerView: 3 },
                        }}
                    >
                        {popularDishes.map((dish) => (
                            <SwiperSlide key={dish.id}>
                                <PopularDishes {...dish} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ul>
            </section>

            <section className="user-dashboard-home-recent-orders">
                <SectionHeader title="Recent Orders" ctaLabel="View all" />

                <p className="user-dashboard-home-recent-orders-empty-text">
                    You do not have any recent orders. Place an order on a
                    delicious meal and check back later.
                </p>
            </section>
        </div>
    );
};

export default UserDashboardHome;
