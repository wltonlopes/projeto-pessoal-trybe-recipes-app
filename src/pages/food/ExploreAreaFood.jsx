import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SwitchFood } from '../../services/SearchFood';
import CardsByArea from '../../components/cards/CardsByArea';

function ExploreAreaFood() {
  const [byArea, setByArea] = useState([]);
  const [nameArea, setNameArea] = useState('');
  const [foodArea, setFoodArea] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await SwitchFood('byArea');
      setByArea(result.meals);
      const resultName = await SwitchFood('All');
      setFoodArea(resultName.meals);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      if (nameArea === 'All') {
        const resultName = await SwitchFood('All');
        setFoodArea(resultName.meals);
      } else {
        const resultName = await SwitchFood('area', nameArea);
        setFoodArea(resultName.meals);
      }
    };
    fetchApi();
  }, [nameArea]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <div className="flex justify-content-center" data-testid="explore-food">
        <select
          className="form-select mt-3"
          style={ { width: '15em' } }
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setNameArea(e.target.value) }
        >
          <option
            data-testid="All-option"
          >
            All
          </option>
          { byArea.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ index }
            >
              {strArea}
            </option>
          ))}
        </select>
      </div>
      <CardsByArea foodArea={ foodArea } />
      <Footer />
    </div>
  );
}

export default ExploreAreaFood;
