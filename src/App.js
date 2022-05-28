import React from 'react';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import { Categories } from './components/Categories';
import { Skeleton } from './components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://sirenko-pizza-app.herokuapp.com/pizzas')
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : pizzas.map((obj) => <PizzaBlock key={obj.title} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
