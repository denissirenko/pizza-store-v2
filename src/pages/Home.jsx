import React from 'react';
import { PizzaBlock } from '../components/PizzaBlock';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
// import { Pagination } from '../components/pagination';

import { useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const activeParamsCategories = categoryId !== 0 ? `category=${categoryId}` : '';
    const activeParamsSort = `&_sort=${sort.type}&_order=${sort.order}`;
    fetch(
      `https://sirenko-pizza-app.herokuapp.com/pizzas?${activeParamsCategories}${activeParamsSort}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort]);
  return (
    <div>
      <>
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items-wrap">
          <div className="content__items">
            {isLoading
              ? pizzas.map((obj) => <Skeleton key={obj.id} />)
              : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </div>
        {/* <Pagination /> */}
      </>
    </div>
  );
};
