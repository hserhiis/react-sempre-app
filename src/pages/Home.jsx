import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import { useSelector } from 'react-redux';
import { SKELETON_COUNT} from '../constants/api';
import {useUrlParams} from '../hooks/useUrlParams';
import {usePizzaData} from '../hooks/usePizzaData';

const Home = () => {
  const { searchValue } = useSelector((state) => state.search);
  const { categoryId } = useSelector((state) => state.category);
  const { sortType } = useSelector((state) => state.sort);
  
  const { items, isLoading } = usePizzaData(categoryId, sortType, searchValue);
  useUrlParams(categoryId, sortType, searchValue);

  const renderPizzaItems = () => {
    if (isLoading) {
      return [...new Array(SKELETON_COUNT)].map((_, index) => (
        <Skeleton key={index} />
      ));
    }

    return items.map((pizza) => (
      <PizzaBlock
        key={pizza.id}
        name={pizza.name}
        image={pizza.image}
        price={pizza.price}
        sizes={pizza.sizes}
        types={pizza.types}
      />
    ));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">
        {isLoading ? 'Loading Pizzas...' : 'All Pizzas'}
      </h2>
      <div className="content__items">{renderPizzaItems()}</div>
    </div>
  );
};

export default Home;