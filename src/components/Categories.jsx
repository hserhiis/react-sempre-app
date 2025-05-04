import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryId, setCategoryName } from "../features/category/categorySlice";
import {setSearchValue} from "../features/search/searchSlice";

const categoriesArray = [
  "Wszystkie",
  "Męsne",
  "Wegetarińska",
  "Grill",
  "Ostre",
  "Zamknięte",
];

const Categories = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = React.useState(0);

  const handleCategoryId = (index) => {
    setActiveCategory(index);
    dispatch(setCategoryId(index));
    dispatch(setCategoryName(categoriesArray[index]));
    dispatch(setSearchValue(""));
  };

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((category, index) => (
          <li
            key={category}
            onClick={handleCategoryId.bind(null, index)}
            className={activeCategory === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
