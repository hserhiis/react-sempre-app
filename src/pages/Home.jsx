import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import {useDispatch, useSelector} from 'react-redux';
import { SKELETON_COUNT} from '../constants/api';
import {fetchData} from "../features/data/dataSlice";
import DragonGame from "../components/PizzaGame";

const Home = () => {
  const { searchValue } = useSelector((state) => state.search);
  const { categoryId } = useSelector((state) => state.category);
  const { sortType } = useSelector((state) => state.sort);
  const { data, status } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const pizzasTitle = status === 'pending' ? 'Loading Pizzas...' : 'All Pizzas'

  React.useEffect(() => {

    const params = new URLSearchParams();
    categoryId > 0 && params.append('category', categoryId);
    params.append('sortBy', sortType);
    params.append('order', sortType === 'rating' ? 'desc' : 'asc');
    searchValue && params.append('search', searchValue);

    dispatch(fetchData(params.toString()))
  }, [categoryId, sortType, searchValue, dispatch]);

  const renderPizzaItems = () => {
    if (status === 'pending') {
      return [...new Array(SKELETON_COUNT)].map((_, index) => (
        <Skeleton key={index} />
      ));
    }
    if (status === 'rejected') {
      return (
        <DragonGame />
      );
    }

    return data.map((pizza) => (
      <PizzaBlock
        key={pizza.name}
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
        {pizzasTitle}
      </h2>
      <div className="content__items">{renderPizzaItems()}</div>
    </div>
  );
};

export default Home;