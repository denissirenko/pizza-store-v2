import React from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { setFilters } from '../redux/slices/filterSlice';

// import qs from 'qs';
import axios from 'axios';
import { PizzaBlock } from '../components/PizzaBlock';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

    setIsLoading(true);

    const activeParamsCategories = categoryId !== 0 ? `category=${categoryId}` : '';
    const activeParamsSort = `&_sort=${sort.type}&_order=${sort.order}`;

    axios
      .get(
        `https://sirenko-pizza-app.herokuapp.com/pizzas?${activeParamsCategories}${activeParamsSort}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
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
              ? pizzas?.map((obj) => <Skeleton key={obj.id} />)
              : pizzas?.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </div>
      </>
    </div>
  );
};
