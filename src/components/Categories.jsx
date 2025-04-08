import React from "react";

const categoriesArray = [
  "Wszystkie",
  "Męsne",
  "Wegetarińska",
  "Grill",
  "Ostre",
  "Zamknięte",
];

const Categories = (props) => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const setCategoryId = (index) => {
    setActiveCategory(index);
    props.setCategoryId(index);
  };

  return (
    <div className="categories">
      <ul>
        {categoriesArray.map((category, index) => (
          <li
            onClick={setCategoryId.bind(null, index)}
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
