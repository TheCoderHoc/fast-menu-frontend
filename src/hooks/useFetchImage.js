import { useState, useEffect } from "react";

const useFetchImage = (url, dependency) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    // FETCH THE PRODUCT IMAGE
    useEffect(() => {
        const fetchProductImage = async () => {
            try {
                const response = await fetch(url);

                const blob = await response.blob();

                const imageUrl = URL.createObjectURL(blob);

                setImageSrc(imageUrl);

                setLoading(false);

                setError("");
            } catch (error) {
                setLoading(false);

                setError("Could not fetch image.");

                console.log(error.message);
            }
        };

        fetchProductImage();
    }, [dependency && dependency]);

    return [loading, error, imageSrc];
};

export default useFetchImage;
