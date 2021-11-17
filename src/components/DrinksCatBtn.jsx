import React, { useContext, useState } from 'react';
import RevenuesContex from '../context/RevenuesContex';
import { SearchDrink } from '../services/SearchDrink';

const MAX_LENGTH = 4;

function DrinksCatBtn() {
  const { drinksCat, setDrinks } = useContext(RevenuesContex);
  const [toggle, setToggle] = useState('');

  const eventHandler = async ({ target }) => {
    const { value } = target;
    setToggle(value);

    if (toggle === value || value === 'All') {
      const response = await SearchDrink(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      setDrinks(response.drinks);
      setToggle('');
    } else {
      const response = await SearchDrink(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`,
      );
      setDrinks(response.drinks);
    }
  };

  const drinks = drinksCat.filter((drink, i) => i <= MAX_LENGTH);

  return (
    <form>
      { drinks.map(({ strCategory }, i) => (
        <div key={ i }>
          <button
            type="button"
            id={ `${strCategory}-category-btn` }
            value={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ eventHandler }
          >
            { strCategory }
          </button>
        </div>
      ))}
      <button
        type="button"
        id="All-category-btn"
        value="All"
        data-testid="All-category-filter"
        onClick={ eventHandler }
      >
        All
      </button>
    </form>
  );
}

export default DrinksCatBtn;
