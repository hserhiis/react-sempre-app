import React, {lazy} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { SKELETON_COUNT} from '../constants/api';
import {fetchData, selectData} from "../features/data/dataSlice";
import {selectSearchValue} from "../features/search/searchSlice";
import {selectCategoryId, selectCategoryName} from "../features/category/categorySlice";
import {selectSortType} from "../features/sort/sortSlice";

const Categories = lazy(() => import('../components/Categories'));
const Sort = lazy(() => import('../components/Sort'));
const PizzaBlock = lazy(() => import('../components/PizzaBlock'));
const Skeleton = lazy(() => import('../components/Skeleton'));
const DragonGame = lazy(() => import('../components/PizzaGame'));


const Home = () => {
  const { categoryId } = useSelector(selectCategoryId);
  const { categoryName } = useSelector(selectCategoryName);
  const { searchValue } = useSelector(selectSearchValue);
  const { sortType } = useSelector(selectSortType);
  const { data, status } = useSelector(selectData);

  const dispatch = useDispatch();


  React.useEffect(() => {

    const params = new URLSearchParams();
    categoryId > 0 && params.append('category', categoryId);
    params.append('sortBy', sortType);
    params.append('order', sortType === 'rating' ? 'desc' : 'asc');
    searchValue && params.append('search', searchValue);
    dispatch(fetchData(params.toString()))
  }, [categoryId, categoryName, sortType, searchValue, dispatch]);

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
      <div id='loadHomePage' className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">
          {status === 'pending' ? 'Loading Pizzas...' : categoryName}
        </h2>
        <div className="content__items">{renderPizzaItems()}</div>
      </div>
  );
};

export default Home;