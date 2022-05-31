import React from 'react';

import { CategoriesContext } from '../pages/Home';

export const Categories = ({ activeCategories, handlerActiveCategories }) => {
  const categoriesContext = React.useContext(CategoriesContext);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => categoriesContext.onClickCategory(index)}
              className={categoriesContext.activeIndex === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
