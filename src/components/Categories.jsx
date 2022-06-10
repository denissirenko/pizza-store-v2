import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, selectFilter } from '../redux/slices/filterSlice';

export const Categories = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectFilter);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => onChangeCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
