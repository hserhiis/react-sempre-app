import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../features/category/categorySlice";

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
  };

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((category, index) => (
          <li
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
