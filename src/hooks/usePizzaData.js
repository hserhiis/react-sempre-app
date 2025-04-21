import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../constants/api";

export const usePizzaData = (categoryId, sortType, searchValue) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPizzas = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (categoryId > 0) params.append('category', categoryId);
                params.append('sortBy', sortType);
                params.append('order', sortType === 'rating' ? 'desc' : 'asc');
                if (searchValue) params.append('search', searchValue);

                const response = await axios.get(`${API_BASE_URL}?${params}`);
                setItems(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch pizzas:', error);
                setItems([]);
            } finally {
                setIsLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchPizzas().then(r =>  console.log(r));
    }, [categoryId, sortType, searchValue]);

    return { items, isLoading };
};