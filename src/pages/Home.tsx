import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
// import { useNavigate } from 'react-router-dom';

// import qs from 'qs';
import { PizzaBlock } from '../components/PizzaBlock';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { selectFilter, selectSort } from '../redux/slices/filterSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const categoryId = useSelector(selectFilter);
  const sort = useSelector(selectSort);
  const { items, status } = useSelector(selectPizzaData);

  // React.useEffect(() => {
  //   const params = qs.parse(window.location.search.substring(1));

  //   const sort = sortItems.find((obj) => obj.type === params.sort);

  //   dispatch(
  //     setFilters({
  //       ...params,
  //       sort,
  //     }),
  //   );
  // }, []);

  React.useEffect(() => {
    // for navigate
    // const queryString = qs.stringify({
    //   categoryId,
    //   sort: sort.type,
    //   order: sort.order,
    // });
    // navigate(`?${queryString}`);
    // for navigate

    const getPizzas = async () => {
      const activeParamsCategories = categoryId !== 0 ? `category=${categoryId}` : '';
      const activeParamsSort = `&_sort=${sort.type}&_order=${sort.order}`;

      dispatch(
        fetchPizzas({
          activeParamsCategories,
          activeParamsSort,
        }),
      );
    };

    getPizzas();

    window.scrollTo(0, 0);
  }, [categoryId, sort, dispatch]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      {status === 'error' ? (
        <h3 style={{ color: '#fe5f1e', textAlign: 'center' }}>Something went wrong!!!</h3>
      ) : (
        <div className="content__items-wrap">
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        </div>
      )}
    </>
  );
};
