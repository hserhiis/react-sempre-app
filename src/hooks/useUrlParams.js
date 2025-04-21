import {useNavigate} from "react-router-dom";
import React from "react";
import qs from "qs";

export const useUrlParams = (categoryId, sortType, searchValue) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const queryParams = qs.stringify({
            sortType,
            categoryId,
            searchValue,
        });
        navigate(`?${queryParams}`);
        window.history.pushState(null, '', `?${queryParams}`);
    }, [categoryId, sortType, searchValue, navigate]);
};