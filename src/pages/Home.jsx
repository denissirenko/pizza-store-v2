import React from 'react';
import { PizzaBlock } from '../components/PizzaBlock';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
// import { Pagination } from '../components/pagination';

export const CategoriesContext = React.createContext();
export const SortContext = React.createContext();

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // for Categories
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  // for Sort
  const [open, setOpen] = React.useState(false);
  const [sortActive, setSortActive] = React.useState(0);

  const handlerSortActive = (index) => {
    setSortActive(index);
    setOpen(false);
  };

  React.useEffect(() => {
    const activeIndexCategories = activeIndex !== 0 ? `category=${activeIndex}` : '';

    setIsLoading(true);
    fetch(`https://sirenko-pizza-app.herokuapp.com/pizzas?${activeIndexCategories}`)
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeIndex]);
  return (
    <div>
      <>
        <div className="content__top">
          <CategoriesContext.Provider value={{ activeIndex, onClickCategory }}>
            <Categories />
          </CategoriesContext.Provider>
          <SortContext.Provider value={{ open, setOpen, sortActive, handlerSortActive }}>
            <Sort />
          </SortContext.Provider>
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
