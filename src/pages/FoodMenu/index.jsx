import React, { useState, useEffect } from "react";
import "./styles.css";
import { Select, Radio, Pagination, Button } from "antd";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchProducts } from "../../redux/product.slice";
import MealItem from "../../layouts/MealItem";
import menuCategories from "../../data/menuCategories";

const FoodMenu = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [showSearch, setShowSearch] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || ""
    );

    const product = useSelector((state) => state.product);

    const searchParamsObject = Object.fromEntries(
        new URLSearchParams(searchParams)
    );

    const toggleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    // DEFAULT QUERIES
    const queries = {
        filter: "all",
        sortBy: "name",
        order: "asc",
        category: "all",
        page: 1,
        limit: 6,
        search: "",
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
        setSearchParams({
            ...searchParamsObject,
            category: value,
            page: 1,
            search: "",
        });
    };

    const handleOrderChange = (e) => {
        setSearchParams({ ...searchParamsObject, order: e.target.value });
    };

    const categoryOptions = menuCategories.map((category) => ({
        label: category.label,
        value: category.label.toLowerCase(),
    }));

    const handlePageChange = (page) => {
        dispatch(fetchProducts({ ...queries, page, limit: 6 }));

        setSearchParams({ ...searchParamsObject, page: page });

        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        // PREVENT FORM SUBMISSION
        e.preventDefault();

        setSearchParams({
            ...searchParamsObject,
            search: searchQuery,
            page: 1,
            category: "all",
        });
    };

    return (
        <div className="food-menu">
            <h1 className="page-main-title">Our Menu</h1>

            <div className="food-menu-options">
                <div className="food-menu-option">
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

                <div className="food-menu-option">
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

                <div className="food-menu-option">
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

                <Button
                    className="btn btn-primary btn-icon"
                    size="large"
                    icon={<AiOutlineSearch size={22} />}
                    onClick={toggleShowSearch}
                />
            </div>

            {showSearch && (
                <form className="food-menu-search-form" onSubmit={handleSearch}>
                    <AiOutlineSearch size={22} color="var(--primary-color)" />

                    <input
                        type="text"
                        className="food-menu-search-input"
                        placeholder="Search our menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            )}

            {queries.search && (
                <h2 className="food-menu-search-results">
                    Search Results for: {queries.search}
                </h2>
            )}

            {product?.products?.length === 0 && (
                <p className="food-menu-empty-products">
                    We could not find any meals. Please try another search term
                    or category.
                </p>
            )}

            <div className="food-menu-items">
                {product?.products?.map((meal) => {
                    return <MealItem key={meal._id} product={meal} />;
                })}
            </div>

            {product?.products?.length !== 0 && (
                <div className="food-menu-pagination">
                    <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        total={product.totalProducts}
                        defaultPageSize={6}
                        pageSize={6}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default FoodMenu;
