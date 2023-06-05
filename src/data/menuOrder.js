import bigSandwicheImage from "../assets/images/food/big-sandwiche.jpg";
import meatWithPotatoesImage from "../assets/images/food/meat-with-potatoes.jpg";
import kebabFriesImage from "../assets/images/food/kebab-with-french-fries.jpg";

const menuOrder = [
    {
        id: 1,
        name: "Big Sandwiche",
        price: 5.59,
        ratings: 5,
        image: bigSandwicheImage,
        amount: 1,
    },
    {
        id: 2,
        name: "Meat With Potatoes",
        price: 6.72,
        ratings: 3,
        image: meatWithPotatoesImage,
        amount: 1,
    },
    {
        id: 3,
        name: "Spicy Kebab Beef",
        price: 5.94,
        ratings: 1,
        image: kebabFriesImage,
        amount: 1,
    },
];

export default menuOrder;
