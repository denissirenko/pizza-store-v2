import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addItem, CartItem, selectCartItemById } from '../../redux/slices/cartSlice';

type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
  category,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [pizzasType, setPizzasType] = React.useState(0);
  const [pizzasSize, setPizzasSize] = React.useState(0);
  const pizzasTypeName = ['тонке', 'традиційне'];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      imageUrl,
      name,
      types: pizzasTypeName[pizzasType],
      sizes: sizes[pizzasSize],
      price,
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item, index) => (
            <li
              onClick={() => setPizzasType(index)}
              key={item}
              className={pizzasType === index ? 'active' : ''}>
              {pizzasTypeName[index]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item, index) => (
            <li
              onClick={() => setPizzasSize(index)}
              key={item}
              className={pizzasSize === index ? 'active' : ''}>
              {item} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} грн</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          {/* <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg> */}
          <span>Додати</span>
          {addedCount > 0 ? <i>{addedCount}</i> : null}
        </button>
      </div>
    </div>
  );
};
