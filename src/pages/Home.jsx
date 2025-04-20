import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [filteredPizzas, setFilteredPizzas] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://67e127e458cc6bf785248fd1.mockapi.io/items")
      .then((response) => {
        return response.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (categoryId == null) {
      setFilteredPizzas(items);
    } else {
      const filteredPizzasByCategory = items.filter((pizza) =>
        pizza.category.includes(categoryId)
      );
      setFilteredPizzas(filteredPizzasByCategory);
    }
  }, [items, categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories setCategoryId={setCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">
        {isLoading ? "Loading Pizzas..." : "All Pizzas"}
      </h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : filteredPizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
