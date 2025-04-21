import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { useSelector } from "react-redux";

const Home = () => {
  const { searchValue } = useSelector((state) => state.search);
  const { categoryId } = useSelector((state) => state.category);
  const { sortType } = useSelector((state) => state.sort);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const contentTitle = isLoading ? "Loading Pizzas..." : "All Pizzas";

  React.useEffect(() => {
    console.log(categoryId);
    const categoryUrl = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortType === "rating" ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";

    const url = `https://67e127e458cc6bf785248fd1.mockapi.io/items?${categoryUrl}&sortBy=${sortType}&order=${order}${search}`;

    console.log(sortType);
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((arr) => {
        setItems(Array.isArray(arr) ? arr : []);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{contentTitle}</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items &&
            items.map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                name={pizza.name}
                image={pizza.image}
                price={pizza.price}
                sizes={pizza.sizes}
                types={pizza.types}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
