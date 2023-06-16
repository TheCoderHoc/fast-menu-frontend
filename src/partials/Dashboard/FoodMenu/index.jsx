import React, { useEffect } from "react";
import "./styles.css";
import { Select, Radio } from "antd";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchProducts } from "../../../redux/productSlice";
import MealItem from "../../../layouts/MealItem";
import menuCategories from "../../../data/menuCategories";

const FoodMenu = () => {
    const dispatch = useDispatch();

    const product = useSelector((state) => state.product);

    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsObject = Object.fromEntries(
        new URLSearchParams(searchParams)
    );

    // DEFAULT QUERIES
    const queries = {
        filter: "all",
        sortBy: "name",
        order: "asc",
        category: "all",
    };

    for (const entry of searchParams.entries()) {
        if (entry) {
            queries[entry[0]] = entry[1];
        }
    }

    useEffect(() => {
        dispatch(fetchProducts(queries));
    }, [searchParams]);

    const handleSortByChange = (value) => {
        setSearchParams({ ...searchParamsObject, sortBy: value });
    };

    const handleFilterChange = (value) => {
        setSearchParams({ ...searchParamsObject, filter: value });
    };

    const handleCategoryChange = (value) => {
        setSearchParams({ ...searchParamsObject, category: value });
    };

    const handleOrderChange = (e) => {
        setSearchParams({ ...searchParamsObject, order: e.target.value });
    };

    const categoryOptions = menuCategories.map((category) => ({
        label: category.label,
        value: category.label.toLowerCase(),
    }));

    return (
        <div className="food-menu">
            <h1 className="food-menu-title">Our Menu</h1>

            <div className="food-menu-items-options">
                <div className="food-menu-items-option">
                    <p>Sort By:</p>

                    <Select
                        defaultValue={queries.sortBy}
                        onChange={handleSortByChange}
                        style={{ width: 120 }}
                        options={[
                            {
                                label: "Name",
                                value: "name",
                            },
                            {
                                label: "Price",
                                value: "price",
                            },
                            {
                                label: "Rating",
                                value: "rating",
                            },
                        ]}
                    />
                </div>

                <div className="food-menu-items-option">
                    <p>Filter</p>

                    <Select
                        defaultValue={queries.filter}
                        onChange={handleFilterChange}
                        style={{ width: 140 }}
                        options={[
                            {
                                label: "All",
                                value: "all",
                            },

                            {
                                label: "Popular",
                                value: "popular",
                            },
                        ]}
                    />
                </div>

                <div className="food-menu-items-option">
                    <p>Category: </p>

                    <Select
                        defaultValue={queries.category}
                        onChange={handleCategoryChange}
                        style={{ width: 120 }}
                        options={[
                            {
                                label: "All",
                                value: "all",
                            },
                            ...categoryOptions,

                            {
                                label: "Others",
                                value: "others",
                            },
                        ]}
                    />
                </div>

                <Radio.Group onChange={handleOrderChange} value={queries.order}>
                    <Radio value="asc">Ascending</Radio>
                    <Radio value="desc">Descending</Radio>
                </Radio.Group>
            </div>

            <form className="food-menu-search-form">
                <AiOutlineSearch size={22} color="var(--primary-color)" />

                <input
                    type="text"
                    className="food-menu-search-input"
                    placeholder="Search our menu..."
                />
            </form>

            <div className="food-menu-items">
                {product?.products?.map((meal) => {
                    return <MealItem key={meal._id} product={meal} />;
                })}
            </div>
        </div>
    );
};

export default FoodMenu;
