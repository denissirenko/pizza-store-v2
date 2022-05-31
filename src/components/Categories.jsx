import React from 'react';

import { CategoriesContext } from '../pages/Home';

export const Categories = ({ activeCategories, handlerActiveCategories }) => {
  const { activeIndex, onClickCategory } = React.useContext(CategoriesContext);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => onClickCategory(index)}
              className={activeIndex === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
