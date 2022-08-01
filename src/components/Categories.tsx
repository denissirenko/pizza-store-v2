import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, selectFilter } from '../redux/slices/filterSlice';

const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectFilter);

  const onChangeCategory = React.useCallback(
    (index: number) => {
      dispatch(setCategoryId(index));
    },
    [dispatch],
  );

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
});
